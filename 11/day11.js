class Challenge {


    findPairs(input) {

    }

    arrayColumn(arr, n) { arr.map(x => x[n])}

    expandImage(image) {
        let newImage = []
        for (let row of image) {
            newImage.push(row.split(''))
            if (row.indexOf('#') === -1) {
                newImage.push(row.split(''))
            }
        }
        console.log('newImage')
        console.log(newImage)
        for (let i = 0; i < newImage[0].length; i++) {
            console.log('arraycolumn: ' + i);
            console.log(this.arrayColumn(newImage, i))

        }
        return newImage
    }



    solve_part1 (input) {
        let sum = 0
        console.log(input.join('\n'))
        let image = this.expandImage(input)
        //let pairs = this.findPairs(input)
        console.log('Expanded')
        console.log(image.join('\n'))
        return sum
    }


    solve_part2 (input) {
       let sum = 0

        return sum
    }
}

module.exports = new Challenge();