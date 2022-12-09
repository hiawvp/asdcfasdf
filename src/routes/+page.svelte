<script lang="ts">
    import SearchStringResult from "../components/SearchStringResult.svelte";
    import KeywordsInput from "../components/KeywordsInput.svelte";

    type Source = "ACM" | "IEEE" | "WoS";
    type Operator = "AND" | "NOT" | "";

    type SourceOption = {
        id: Number;
        value: Source;
    };
    type OperatorOption = {
        id: Number;
        value: Operator;
    };

    type BlockInfo = {
        id: Number;
        content: String;
        // operator: Operator;
        operatorOption: OperatorOption;
        isLast: boolean;
    };

    let sources: SourceOption[] = [
        { id: 1, value: `ACM` },
        { id: 2, value: `IEEE` },
        { id: 3, value: `WoS` },
    ];

    let operators: OperatorOption[] = [
        { id: 1, value: "AND" },
        { id: 2, value: "NOT" },
    ];

    let blocks: BlockInfo[] = [
        {
            id: 1,
            content: "",
            isLast: true,
            operatorOption: operators[0],
        },
    ];
    let selected_source: SourceOption = sources[0];
    let search_string: String = "";

    function getFormattedQuadrant(
        quadrant: String[],
        source: Source = "IEEE"
    ): String {
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

    function getSearchString(
        quadrants: String[][],
        source: Source,
        wordsToExclude?: String[]
    ): String {
        const quadrantsSearchString = quadrants
            .filter((quadrant) => !!quadrant[0])
            .map((quadrant) => getFormattedQuadrant(quadrant, source));
        let output = quadrantsSearchString.join("\nAND\n");
        if (wordsToExclude && wordsToExclude.length > 0) {
            output += `\nNOT\n${getFormattedQuadrant(wordsToExclude, source)}`;
        }
        return output;
    }

    $: {
        let and_blocks: BlockInfo[] = [];
        let not_blocks: BlockInfo[] = [];
        let and_next = true;
        for (let index = 0; index < blocks.length; index++) {
            if (and_next) {
                and_blocks.push(blocks[index]);
            } else {
                not_blocks.push(blocks[index]);
            }
            and_next = blocks[index].operatorOption.value === "AND";
        }

        let quadrants: String[][] = and_blocks.map((element) =>
            element.content.trim().split("\n")
        );
        let wordsToExclude: String[] = not_blocks
            .map((element) => element.content.trim().split("\n"))
            .flat()
            .filter((v) => v.length > 0);

        search_string = getSearchString(
            quadrants,
            selected_source.value,
            wordsToExclude
        );
        // console.log("resulting string: ", search_string);
    }

    function addNewBlock() {
        let num_blocks = blocks.length;
        blocks[num_blocks - 1].isLast = false;
        let b: BlockInfo = {
            id: num_blocks + 1,
            content: "",
            // operator: "",
            operatorOption: operators[0],
            isLast: true,
        };
        blocks = [...blocks, b];
        // console.log(num_blocks);
    }

    function clearInputs() {
        blocks = [
            {
                id: 1,
                content: "",
                operatorOption: operators[0],
                isLast: true,
            },
            // {
            //     id: 2,
            //     content: "parallel\nalgorithm",
            //     operatorOption: operators[0],
            //     isLast: true,
            // },
        ];
        selected_source = sources[0];
    }
</script>

<div
    class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[url('/yui.jpg')] bg-[length:200px_100px] py-6 sm:py-12"
>
    <div
        class="relative bg-gray-100 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5   rounded-lg mx-auto"
    >
        <div class="h-[480px] w-[400px] ">
            <div class="flex flex-row ">
                <select
                    bind:value={selected_source}
                    class="w-24 rounded bg-slate-700 text-white px-2 py-1 "
                >
                    {#each sources as question}
                        <option value={question}>
                            {question.value}
                        </option>
                    {/each}
                </select>

                <button
                    class="bg-primary text-white rounded ml-auto px-2 py-1"
                    on:click={clearInputs}
                >
                    Clear
                </button>
            </div>

            <div class="flex flex-col max-h-[380px] overflow-scroll">
                {#each blocks as item, i}
                    <div class="flex flex-row items-center space-x-4">
                        <!-- content here -->
                        <KeywordsInput bind:content={item.content} />
                        <button
                            class="bg-blue-700 text-white rounded-sm col-2 w-12 h-7 disabled:bg-slate-400"
                            on:click={addNewBlock}
                            disabled={!item.content.trim() || !item.isLast}
                        >
                            +
                        </button>
                        <select
                            bind:value={item.operatorOption}
                            class="w-24 rounded bg-slate-700 text-white px-2 py-1 text-sm {!item.isLast
                                ? ''
                                : 'hidden'}"
                        >
                            {#each operators as operator}
                                <option value={operator}>
                                    {operator.value}
                                </option>
                            {/each}
                        </select>
                    </div>
                {/each}
            </div>
        </div>

        <SearchStringResult {search_string} />
    </div>
</div>
