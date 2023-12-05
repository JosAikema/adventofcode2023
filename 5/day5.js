
class Challenge {

    convertMapToList(map) {
        let list = []
        map.forEach(item => {
           const [dest, src, len] = item.split(' ').map(Number)
           list.push({
             src: src ,
             dest: dest,
             len: len 
           })
        })
        return list
        return map
    }

    convertToAlmanac(input) {
        let almanac = input.split(/\n\s*\n/)
        return {
            seeds : almanac[0].split(':')[1].trimStart().trimEnd().split(' '),
            seedToSoil: this.convertMapToList(almanac[1].split('\n').slice(1)),
            soilToFertilizer: this.convertMapToList(almanac[2].split('\n').slice(1)),
            fertilizerToWater: this.convertMapToList(almanac[3].split('\n').slice(1)),
            waterToLight:this.convertMapToList(almanac[4].split('\n').slice(1)),
            lightToTemperature: this.convertMapToList(almanac[5].split('\n').slice(1)),
            temperatureToHumidity: this.convertMapToList(almanac[6].split('\n').slice(1)),
            humidityToLocation: this.convertMapToList(almanac[7].split('\n').slice(1)),
            //total: almanac

        }
    }

    useMap(source, x) {
        let newVal = x
        source.forEach(item => {
        
            if (x >= item.src && x < (parseInt(item.src) + parseInt(item.len)) ) {
                newVal = parseInt(item.dest) + parseInt(x) - parseInt(item.src)
                return newVal
            }    
        })
        return newVal
    }

    useConvertedMap(source, x) {
        //console.log(source)
        let newVal = x
        source.forEach(item => {
            //console.log('check x: ' + x + ' between ' + item.src + ' and ' + (parseInt(item.src) + parseInt(item.len)));
            if (x >= item.dest && x < (parseInt(item.dest) + parseInt(item.len)) ) {
                //console.log('ertussen')
                newVal = parseInt(item.src) + parseInt(x) - parseInt(item.dest)
                //console.log('newVal :' + newVal)
                return newVal
            }
            
        })
        
        return newVal
    }

    seed2Location(seed) {
        let soil = this.useMap(this.almanac.seedToSoil, seed)
        let fertilizer = this.useMap(this.almanac.soilToFertilizer, soil)
        let water = this.useMap(this.almanac.fertilizerToWater, fertilizer)
        let light = this.useMap(this.almanac.waterToLight, water)
        let temperature = this.useMap(this.almanac.lightToTemperature, light)
        let humidity = this.useMap(this.almanac.temperatureToHumidity, temperature)
        let location =  this.useMap(this.almanac.humidityToLocation, humidity)
        return location
    }
    
    location2seed(location) {
        let humidity = this.useConvertedMap(this.almanac.humidityToLocation, location)
        let temperature = this.useConvertedMap(this.almanac.temperatureToHumidity, humidity)
        let light = this.useConvertedMap(this.almanac.lightToTemperature, temperature)
        let water = this.useConvertedMap(this.almanac.waterToLight, light)
        let fertilizer = this.useConvertedMap(this.almanac.fertilizerToWater, water)
        let soil = this.useConvertedMap(this.almanac.soilToFertilizer, fertilizer)
        let seed = this.useConvertedMap(this.almanac.seedToSoil, soil)
        return seed
    }

    humidity2seed(humidity) {
        let temperature = this.useConvertedMap(this.almanac.temperatureToHumidity, humidity)
        let light = this.useConvertedMap(this.almanac.lightToTemperature, temperature)
        let water = this.useConvertedMap(this.almanac.waterToLight, light)
        let fertilizer = this.useConvertedMap(this.almanac.fertilizerToWater, water)
        let soil = this.useConvertedMap(this.almanac.soilToFertilizer, fertilizer)
        let seed = this.useConvertedMap(this.almanac.seedToSoil, soil)
        return seed
    }

    temperature2seed(temperature) {
        let light = this.useConvertedMap(this.almanac.lightToTemperature, temperature)
        let water = this.useConvertedMap(this.almanac.waterToLight, light)
        let fertilizer = this.useConvertedMap(this.almanac.fertilizerToWater, water)
        let soil = this.useConvertedMap(this.almanac.soilToFertilizer, fertilizer)
        let seed = this.useConvertedMap(this.almanac.seedToSoil, soil)
        return seed
    }

    solve_part1 (input) {
        this.almanac = this.convertToAlmanac(input)
        let minLocation = this.seed2Location(this.almanac.seeds[0]);
        
        this.almanac.seeds.forEach(seed => {
            let location = this.seed2Location(seed);
            //console.log('seed: ' + seed + ' / location: ' + location)
            minLocation = Math.min(minLocation, location)

        })
        return minLocation;

    }

    solve_part2_old (input) {
        this.almanac = this.convertToAlmanac(input)
        let minLocation = this.seed2Location(this.almanac.seeds[0]);
        
        //console.log(this.almanac)
        //console.log(this.almanac.seeds)
        for (let i = 0; i < this.almanac.seeds.length; i += 2) {
            console.log('Seed starting at ' + this.almanac.seeds[i])
            for (let j=parseInt(this.almanac.seeds[i]); j < parseInt(this.almanac.seeds[i]) + parseInt(this.almanac.seeds[i+1]);j++) {
                //console.log('j:' + j)
                let location = this.seed2Location(j);
                minLocation = Math.min(minLocation, location)
            }
        }
        //this.almanac.seeds.forEach(seed => {
        //     let location = this.seed2Location(seed);
        //     console.log('seed: ' + seed + ' / location: ' + location)
        //     minLocation = Math.min(minLocation, location)

        // })
        return minLocation;     

    }

    solve_part2 (input) {
        
        this.almanac = this.convertToAlmanac(input)
        let foundseed = undefined

        console.log('Check via locations')
        let locationList = this.almanac.humidityToLocation.sort((a,b) => {
            return a.dest - b.dest
        })
        
        
        locationList.every(loc => {
            console.log(loc);
            for (let i = parseInt(loc.dest); i < parseInt(loc.dest) + parseInt(loc.len); i++ ) {
                //console.log(i)
                let seed = this.location2seed(i)
                //console.log('seed for loc '+i+': ' + seed)
                if (seed !== undefined) {
                    foundseed = seed
                }
            }
            
            if (foundseed !== undefined) {
                return false
            } else {
                return true
            }
        })

        console.log('Check via humidity')
        let humidityList = this.almanac.temperatureToHumidity.sort((a,b) => {
            return a.dest - b.dest
        })
        humidityList.every(item => {
            console.log(item);
            for (let i = parseInt(item.dest); i < parseInt(item.dest) + parseInt(item.len); i++ ) {
                //console.log(i)
                let seed = this.humidity2seed(i)
                //console.log('seed for item '+i+': ' + seed)
                if (seed !== undefined) {
                    foundseed = seed
                }
            }
            
            if (foundseed !== undefined) {
                return false
            } else {
                return true
            }
        })

        console.log('Check via temperature')
        let lst = this.almanac.lightToTemperature.sort((a,b) => {
            return a.dest - b.dest
        })
        lst.every(item => {
            console.log(item);
            for (let i = parseInt(item.dest); i < parseInt(item.dest) + parseInt(item.len); i++ ) {
                let seed = this.temperature2seed(i)
                if (seed !== undefined) {
                    console.log('found seed ' + seed + ' with temperature ' + i)
                    foundseed = seed
                    break;
                }
            }
            
            if (foundseed !== undefined) {
                return false
            } else {
                return true
            }
        })
        
        let minLocation = 0
        if (foundseed !== undefined) {
            console.log('foundseed: ' + foundseed)
            minLocation = this.seed2Location(foundseed)
            console.log('location:' + minLocation)
        }
        return minLocation
    }
}

module.exports = new Challenge();