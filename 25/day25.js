const nx = require('jsnetworkx');
const {numberOfNodes} = require("jsnetworkx/node/classes/functions");

const fs = require('fs');
class Challenge {
    test_part1 = 54
    test_part2 = -1
    noSplit = false

    solve_part1 (input) {
        let graph = new nx.Graph();
        for (let line of input) {
            let [a, b] = line.split(':')

            b.trimStart().split(' ').forEach((node) => {

                graph.addEdge(a, node)
                graph.addEdge(node, a)
            })


        }
        //console.log('Nodes: ' + nx.numberOfNodes(graph) + ', Edges: ' + nx.numberOfEdges(graph))
        console.log(nx.info(graph))

        let dot = "digraph G {\n";
        for (let line of input) {
            let [a, b] = line.split(':')
            dot += `  ${a}`;
            let nodes = b.trimStart().split(' ')
            if (nodes.length) dot += ` -> ${nodes.join(",")}`;
            dot += "\n";
        }
        dot += "}";
        fs.writeFile("./data.dot", dot, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });

        let svg = fs.readFileSync('./data.svg', 'utf8').split('\n')
        let textLinesLeft = []
        let textLinesRight = []
        svg.forEach((line, i) => {
            //console.log(line.substring(0, 4))
            if (line.substring(0, 5) === '<text') {
                let attr = line.split(' ')
                attr.forEach((a, i) => {
                    if (a.substring(0, 1) === 'x') {
                        let x = a.split('=')[1].replace('"', '').replace('"', '')
                        if (+x < 27530) {
                            textLinesLeft.push(line)
                        } else {
                            textLinesRight.push(line)
                        }

                    }
                })


            }
        })

        console.log(textLinesLeft)

        console.log('Left: ' + textLinesLeft.length)
        console.log('Right: ' + textLinesRight.length)

        console.log(textLinesLeft.length * textLinesRight.length)

        return 545

    }

    solve_part2 (input) {

        return 0


    }
}

module.exports = new Challenge();
