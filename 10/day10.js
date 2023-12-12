const utils = require('../lib/utils');

class Challenge {

    findNeighbours (r, c) {
        let val = this.grid[r][c]
        let neighbours = []
        if (val === '|') {
            if (['|', '7', 'F'].includes(this.grid[r - 1][c])) {
                neighbours.push({r: r - 1,c: c})
            }
            if (['|', 'J', 'L'].includes(this.grid[r + 1][c])) {
                neighbours.push({r: r + 1,c: c})
            }
        }
        else if (val === '-') {
            if (['-', 'L', 'F'].includes(this.grid[r][c-1])) {
                neighbours.push({r: r ,c: c - 1})
            }
            if (['-', '7', 'J'].includes(this.grid[r][c+1])) {
                neighbours.push({r: r,c: c+1})
            }
        }
        else if (val === 'L') {
            if (['|', '7', 'F'].includes(this.grid[r-1][c])) {
                neighbours.push({r: r - 1, c: c})
            }
            if (['-', '7', 'J'].includes(this.grid[r][c+1])) {
                neighbours.push({r: r,c: c + 1})
            }
        }
        else if (val === 'J') {
            if (['|', '7', 'F'].includes(this.grid[r-1][c])) {
                neighbours.push({r: r - 1,c: c})
            }
            if (['-', 'L', 'F'].includes(this.grid[(r, c - 1)])) {
                neighbours.push({r: r,c: c - 1})
            }
        }
        else if (val === '7') {
            if (['-', 'L', 'F'].includes(this.grid[r][c-1])) {
                neighbours.push({r: r,c: c - 1})
            }
            if (['|', 'J', 'L'].includes(this.grid[r+1][c])) {
                neighbours.push({r: r + 1,c: c})
            }
        }
        else if (val === 'F') {
            if (['-', '7', 'J'].includes(this.grid[r][c+1])) {
                neighbours.push({r: r,c: c + 1})
            }
            if (['|', 'J', 'L'].includes(this.grid[r+1][c])) {
                neighbours.push({r: r + 1,c: c})
            }
        }
        return neighbours
    }

    // bfs( grid, row, col) {
    //
    //     let vis = utils.initialize2DArray(grid.length, grid[0].length,false)
    //     function isValid(row, col)
    //     {
    //         // If cell lies out of bounds
    //         if (row < 0 || col < 0
    //             || row >= grid.length || col >= grid[0].length)
    //             return false;
    //
    //         // If cell is already visited
    //         if (vis[row][col])
    //             return false;
    //
    //         // Otherwise
    //         return true;
    //     }
    //
    //     // Stores indices of the matrix cells
    //     let q = [];
    //
    //     // Mark the starting cell as visited
    //     // and push it into the queue
    //     q.push([row, col ]);
    //     vis[row][col] = true;
    //
    //     // Iterate while the queue
    //     // is not empty
    //     while (q.length!=0) {
    //
    //         var cell = q[0];
    //         var x = cell[0];
    //         var y = cell[1];
    //
    //         console.log( grid[x][y] + " ");
    //
    //         q.shift();
    //
    //         // Go to the adjacent cells
    //         let neighbors = this.findNeighbours(x, y)
    //         for (let i = 0; i < neighbors.length; i++) {
    //             if (isValid(neighbors[i].c, neighbors[i].r)) {
    //                 q.push([neighbors[i].c,  neighbors[i].r ]);
    //                 vis[neighbors[i].c][neighbors[i].r ] = true;
    //             }
    //         }
    //     }
    // }

    bfs(start) {
        let q = []
        q.push({r: start[0], c: start[1]})
        let dist = []


        //dist[start] = 0
        dist['r_' + start[0] + '_c_' + start[1]] = 0
        let seen = []
        seen['r_' + start[0] + '_c_' + start[1]] = true
        //seen = [{r: start[0], c: start[1]}]
        while (q.length > 0) {
            let v = q.pop()
            //if (goal != undefined && v == goal) {
                //break
               let neighbours = this.findNeighbours(v.r, v.c)
                for (let i in neighbours) {
                    let w =neighbours[i];
                    if (seen['r_' + w.r + '_c_' + w.c] === undefined) {
                    //if (seen.indexOf(w) == -1) {
                        seen['r_' + w.r + '_c_' + w.c] = true
                        //seen.push(w)
                        dist['r_' + w.r + '_c_' + w.c] = dist['r_' + v.r + '_c_' + v.c] + 1
                        q.unshift(w)
                    }
                }
            //}
        }
        return dist
    }

    solve_part1 (input) {
        let sum = 0

        this.grid = utils.initialize2DArray(input.length, input[0].length,'.')
        let start = null
        console.log(this.grid)
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input[i].length; j++) {
                this.grid[i][j] = input[i][j]
                if (input[i][j] === 'S') {
                    start = [i,j]
                }
            }
        }
        console.log(this.grid)
        console.log(start)
        console.log(this.grid[start[0]][start[1]])
        //What is pipe at starting position?
        let pipes = ['|', '-', 'L', 'J', '7', 'F']
        for (let i = 0; i < pipes.length; i++) {
            this.grid[start[0]][start[1]] = pipes[i]
            if (this.findNeighbours(start[0], start[1]).length === 2) {
                break
            }
        }
        console.log(this.grid[start[0]][start[1]])

        //let distances  = utils.bfs(start, null, this.neighbors)
        console.log('distances')
        let distances = this.bfs([start[0], start[1]])

        console.log(distances)
        let max = Math.max(...Object.values(distances));
        console.log('max: ' + max)
        return max
    }


    solve_part2 (input) {
       let sum = 0

        return sum
    }
}

module.exports = new Challenge();