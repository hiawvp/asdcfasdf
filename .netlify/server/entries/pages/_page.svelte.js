import { c as create_ssr_component, e as escape, d as add_attribute, f as each, v as validate_component } from "../../chunks/index.js";
const SearchStringResult = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { search_string } = $$props;
  if ($$props.search_string === void 0 && $$bindings.search_string && search_string !== void 0)
    $$bindings.search_string(search_string);
  return `<div class="${"flex flex-row items-center space-x-4"}"><div id="${"my-div"}" class="${"w-10/12 h-32 mx-2 rounded-sm border-2 shadow-sm overflow-y-scroll font-light text-xs text-black whitespace-pre-line "}">${escape(search_string)}</div>
    <button><svg xmlns="${"http://www.w3.org/2000/svg"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke-width="${"1.5"}" stroke="${"currentColor"}" class="${"w-6 h-6 border-x rounded"}" color="${"black"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" d="${"M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"}"></path></svg></button></div>`;
});
const KeywordsInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { content } = $$props;
  if ($$props.content === void 0 && $$bindings.content && content !== void 0)
    $$bindings.content(content);
  return `<textarea${add_attribute("placeholder", "cock\nballs", 0)} class="${"h-16 w-3/6 ml-2 pl-1 my-4 border shadow-sm font-light text-xs leading-3 rounded"}">${content || ""}</textarea>`;
});
function getFormattedQuadrant(quadrant, source = "IEEE") {
  let searchLocation = "";
  if (source === "IEEE") {
    searchLocation = '"Abstract": ';
  } else if (source === "ACM") {
    searchLocation = "Abstract: ";
  } else if (source === "WoS") {
    searchLocation = "";
  }
  const partialStrings = quadrant.map((word) => {
    const formattedWord = word.replace("-", "\\-");
    return `${searchLocation}"${formattedWord}"`;
  });
  const quadrantString = `(${partialStrings.join(" OR ")})`;
  return quadrantString;
}
function getSearchString(quadrants, source, wordsToExclude) {
  const quadrantsSearchString = quadrants.filter((quadrant) => !!quadrant[0]).map((quadrant) => getFormattedQuadrant(quadrant, source));
  let output = quadrantsSearchString.join("\nAND\n");
  if (wordsToExclude && wordsToExclude.length > 0) {
    output += `
NOT
${getFormattedQuadrant(wordsToExclude, source)}`;
  }
  return output;
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let sources = [{ id: 1, value: `ACM` }, { id: 2, value: `IEEE` }, { id: 3, value: `WoS` }];
  let operators = [{ id: 1, value: "AND" }, { id: 2, value: "NOT" }];
  let blocks = [
    {
      id: 1,
      content: "",
      isLast: true,
      operatorOption: operators[0]
    }
  ];
  let selected_source = sources[0];
  let search_string = "";
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      {
        let and_blocks = [];
        let not_blocks = [];
        let and_next = true;
        for (let index = 0; index < blocks.length; index++) {
          if (and_next) {
            and_blocks.push(blocks[index]);
          } else {
            not_blocks.push(blocks[index]);
          }
          and_next = blocks[index].operatorOption.value === "AND";
        }
        let quadrants = and_blocks.map((element) => element.content.trim().split("\n"));
        let wordsToExclude = not_blocks.map((element) => element.content.trim().split("\n")).flat().filter((v) => v.length > 0);
        search_string = getSearchString(quadrants, selected_source.value, wordsToExclude);
      }
    }
    $$rendered = `<div class="${"relative flex min-h-screen flex-col justify-center overflow-hidden bg-[url('/yui.jpg')] bg-[length:200px_100px] py-6 sm:py-12"}"><div class="${"relative bg-gray-100 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 rounded-lg mx-auto"}"><div class="${"h-[480px] w-[400px] "}"><div class="${"flex flex-row "}"><select class="${"w-24 rounded bg-slate-700 text-white px-2 py-1 "}">${each(sources, (question) => {
      return `<option${add_attribute("value", question, 0)}>${escape(question.value)}
                        </option>`;
    })}</select>

                <button class="${"bg-primary text-white rounded ml-auto px-2 py-1"}">Clear
                </button></div>

            <div class="${"flex flex-col max-h-[380px] overflow-scroll"}">${each(blocks, (item, i) => {
      return `<div class="${"flex flex-row items-center space-x-4"}">
                        ${validate_component(KeywordsInput, "KeywordsInput").$$render(
        $$result,
        { content: item.content },
        {
          content: ($$value) => {
            item.content = $$value;
            $$settled = false;
          }
        },
        {}
      )}
                        <button class="${"bg-blue-700 text-white rounded-sm col-2 w-12 h-7 disabled:bg-slate-400"}" ${!item.content.trim() || !item.isLast ? "disabled" : ""}>+
                        </button>
                        <select class="${"w-24 rounded bg-slate-700 text-white px-2 py-1 text-sm " + escape(!item.isLast ? "" : "hidden", true)}">${each(operators, (operator) => {
        return `<option${add_attribute("value", operator, 0)}>${escape(operator.value)}
                                </option>`;
      })}</select>
                    </div>`;
    })}</div></div>

        ${validate_component(SearchStringResult, "SearchStringResult").$$render($$result, { search_string }, {}, {})}</div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
