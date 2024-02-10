import Line from "./Line";

interface Props {
    lines: string[];
}

function DiffSet({ lines }: Props) {
    const firstLine = lines[0];
    const lineNumbers = firstLine.split("@@")[1];
    const numbers = lineNumbers.split(/[, ]/);
    const originalStartLineNumber = Math.abs(Number(numbers[1]));
    const originalDiffSetLength = Math.abs(Number(numbers[2]));
    const newStartLineNumber = Math.abs(Number(numbers[3]));
    const newDiffSetLength = Math.abs(Number(numbers[4]));

    return lines.map((line, index) => {
        function _getOriginalLineNumber() {
            let counter = 0;

            for (let i = 0; i < index; i++) {
                if (!lines[i].startsWith("@@") && !lines[i].startsWith("+")) {
                    counter++;
                }
            }

            return originalStartLineNumber + counter;
        }

        function _getNewLineNumber() {
            let counter = 0;

            for (let i = 0; i < index; i++) {
                if (!lines[i].startsWith("@@") && !lines[i].startsWith("-")) {
                    counter++;
                }
            }

            return newStartLineNumber + counter;
        }

        function getOriginalLineNumber() {
            const originalLines = lines.filter(
                (line) => !line.startsWith("@@") && !line.startsWith("+")
            );

            const originalLinesIndex = originalLines.indexOf(line);
            const originalLineNumber =
                originalStartLineNumber + originalLinesIndex;

            return originalLineNumber;
        }

        function getNewLineNumber() {
            const newLines = lines.filter(
                (line) => !line.startsWith("@@") && !line.startsWith("-")
            );

            const newLinesIndex = newLines.indexOf(line);
            const newLineNumber = newStartLineNumber + newLinesIndex;

            return newLineNumber;
        }
        // function getNewLineNumber(startLineNumber: number) {
        //     if (startLineNumber === 0) {
        //         return startLineNumber + index;
        //     }

        //     return startLineNumber + index - 1;
        // }

        return (
            <Line
                key={index}
                line={line}
                index={index}
                originalLineNumber={_getOriginalLineNumber()}
                newLineNumber={_getNewLineNumber()}
            />
        );
    });
}

export default DiffSet;
