class Challenge {
    test_part1 = 21
    test_part2 = 456

    solve_part1 (input) {

        let sum = 0
        console.log(input)
        input.forEach(line => {
            let [springs, counts] = line.split(' ')
            console.log('Springs: ' + springs)
            console.log(counts)
            
        })
        
        return sum
    }


    solve_part2 (input) {
       let sum = 0
   
        return sum
    }
}

module.exports = new Challenge();