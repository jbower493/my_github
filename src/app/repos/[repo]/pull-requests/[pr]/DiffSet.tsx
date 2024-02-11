import Line from "./Line";

interface Props {
    lines: string[];
    prHeadSha: string;
    filePath: string;
    repo: string;
    pr: number;
}

function DiffSet({ lines, prHeadSha, filePath, repo, pr }: Props) {
    const firstLine = lines[0];
    const lineNumbers = firstLine.split("@@")[1];
    const numbers = lineNumbers.split(/[, ]/);
    const originalStartLineNumber = Math.abs(Number(numbers[1]));
    const originalDiffSetLength = Math.abs(Number(numbers[2]));
    const newStartLineNumber = Math.abs(Number(numbers[3]));
    const newDiffSetLength = Math.abs(Number(numbers[4]));

    return lines.map((line, index) => {
        function getOriginalLineNumber() {
            let counter = 0;

            for (let i = 0; i < index; i++) {
                if (!lines[i].startsWith("@@") && !lines[i].startsWith("+")) {
                    counter++;
                }
            }

            return originalStartLineNumber + counter;
        }

        function getNewLineNumber() {
            let counter = 0;

            for (let i = 0; i < index; i++) {
                if (!lines[i].startsWith("@@") && !lines[i].startsWith("-")) {
                    counter++;
                }
            }

            return newStartLineNumber + counter;
        }

        return (
            <Line
                key={index}
                line={line}
                index={index}
                originalLineNumber={getOriginalLineNumber()}
                newLineNumber={getNewLineNumber()}
                prHeadSha={prHeadSha}
                filePath={filePath}
                repo={repo}
                pr={pr}
            />
        );
    });
}

export default DiffSet;
