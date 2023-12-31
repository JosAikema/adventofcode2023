const dayjs = require('dayjs')
const utils = require('./lib/utils');

let day = dayjs().date();
day = 11
console.log('Day: ', day)


let challenge = require('./' + day + '/day' + day + '.js');

const part1 = () => {
    console.log('Part 1')
    let noSplit = challenge.noSplit || false
    let check_value = challenge.test_part1
    let test_result = challenge.solve_part1(utils.processInput('./' + day + '/test.txt', noSplit));
    

    if (test_result === check_value) {
        console.log('Test passed')
        console.log('Test: ', test_result)
        console.log('Answer: ', challenge.solve_part1(utils.processInput('./' + day + '/input.txt', noSplit)))
    } else {
        console.log('test failed')
        console.log('Test: ', test_result)
    }
}

const part2 = () => {
    console.log('Part 2')
    let noSplit = challenge.noSplit || false
    let check_value = challenge.test_part2
    let test_result = challenge.solve_part2(utils.processInput('./' + day + '/test.txt', noSplit));

    if (test_result === check_value) {
        console.log('Test passed')
        console.log('Test: ', test_result)
        console.log('Answer: ', challenge.solve_part2(utils.processInput('./' + day + '/input.txt', noSplit)))
    } else {
        console.log('test failed')
        console.log('Test: ', test_result)
    }
}


part1()
part2()

