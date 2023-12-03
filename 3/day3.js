
class Challenge {




    solve_part1 (input) {
        function checkValid(y, x) {
            const y_values = [-1, 0, 1];
            const x_values = [-1, 0, 1];
            const symbols = ['%', '#', '*', '/', '@', '$', '&', '=', '+', '-'];

            for (const dy of y_values) {
                for (const dx of x_values) {
                    if (!(y+dy < 0 || y+dy >= input.length || x+dx < 0 || x+dx >= input[0].length)) {
                        if (symbols.includes(input[y+dy][x+dx]))
                            return true;
                    }
                }
            }
            return false;
        }
        const parts = [];
        let temp = '';
        let tempPart = false;

        for (let y = 0; y < input.length; y++) {
            for (let x = 0; x < input[y].length; x++) {
                if (Number.isInteger(+input[y][x])) {
                    temp += input[y][x];
                    tempPart = (tempPart || checkValid(y, x, input));
                }
                if (!Number.isInteger(+input[y][x]) || x == input[x].length-1) {
                    if (temp.length > 0) {
                        if (tempPart)
                            parts.push(+temp);
                        temp = '';
                        tempPart = false; }}}}

        return (parts.reduce((a,b)=>a+b));

    }

    solve_part2 (inputLines) {
        function isPart(i, j) {
            const y_values = [-1, 0, 1];
            const x_values = [-1, 0, 1];
            const symbols = ['€'];

            for (const dy of y_values) {
                for (const dx of x_values) {
                    if (!(i+dy < 0 || i+dy >= input.length || j+dx < 0 || j+dx >= input[0].length)) {
                        if (symbols.includes(input[i+dy][j+dx]))
                            return true;
                    }
                }
            }
            return false;
        }

        function getNumsBySymbol() {
            const parts = [];
            let temp = '';
            let tempPart = false;

            for (let y = 0; y < input.length; y++) {
                for (let x = 0; x < input[y].length; x++) {
                    if (Number.isInteger(+input[y][x])) {
                        temp += input[y][x];
                        tempPart = (tempPart || isPart(y, x));
                    }
                    if (!Number.isInteger(+input[y][x]) || x == input[y].length-1) {
                        if (temp.length > 0) {
                            if (tempPart)
                                parts.push(+temp);
                            temp = '';
                            tempPart = false; }}}}

            return parts;
        }

        let parts = [];
        let sum = 0;
        let input = inputLines.map(e => e.split(''));
        for (let y = 0; y < input.length; y++) {
            for (let x = 0; x < input[y].length; x++) {
                if (input[y][x] == '*') {
                    input[y][x] = '€';
                    parts = getNumsBySymbol();
                    if (parts.length == 2)
                        sum += parts.reduce((a,b) => a*b, 1);
                    input[y][x] = '*';
                }
            }
        }
        return sum
    }
}

module.exports = new Challenge();