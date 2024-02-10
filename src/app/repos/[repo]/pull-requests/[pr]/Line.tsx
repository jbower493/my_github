type DiffHeaderLine = `@@${string}`;

function isDiffHeaderLine(line: string): line is DiffHeaderLine {
    return line.startsWith("@@");
}

type AddedLine = `+${string}`;

function isAddedLine(line: string): line is AddedLine {
    return line.startsWith("+");
}

type RemovedLine = `-${string}`;

function isRemovedLine(line: string): line is RemovedLine {
    return line.startsWith("-");
}

interface Props {
    line: DiffHeaderLine | AddedLine | RemovedLine | string;
    index: number;
    originalLineNumber: number;
    newLineNumber: number;
}

function Line({ line, index, originalLineNumber, newLineNumber }: Props) {
    if (line === "\\ No newline at end of file") {
        return null;
    }

    if (isDiffHeaderLine(line)) {
        return (
            <p className="bg-blue-900 py-2 px-4">
                <span className="w-24 inline-block" />
                {line}
            </p>
        );
    }

    if (isAddedLine(line)) {
        return (
            <p
                key={index}
                className="bg-green-900 py-1 px-4 whitespace-pre flex items-center"
            >
                <span className="inline-flex justify-evenly">
                    <span className="w-12 inline-flex justify-center" />
                    <span className="w-12 inline-flex justify-center">
                        {newLineNumber}
                    </span>
                </span>
                <span className="w-5 inline-block">{line[0]}</span>
                {line.slice(1)}
            </p>
        );
    }

    if (isRemovedLine(line)) {
        return (
            <p key={index} className="bg-red-900 py-1 px-4 whitespace-pre">
                <span className="w-24 inline-flex justify-evenly">
                    <span className="w-12 inline-flex justify-center">
                        {originalLineNumber}
                    </span>
                    <span className="w-12 inline-flex justify-center" />
                </span>
                <span className="w-5 inline-block">{line[0]}</span>
                {line.slice(1)}
            </p>
        );
    }

    return (
        <p key={index} className="py-1 px-4 whitespace-pre">
            <span className="w-24 inline-flex justify-evenly">
                <span className="w-12 inline-flex justify-center">
                    {originalLineNumber}
                </span>
                <span className="w-12 inline-flex justify-center">
                    {newLineNumber}
                </span>
            </span>
            <span className="w-5 inline-block" />
            {line}
        </p>
    );
}

export default Line;
