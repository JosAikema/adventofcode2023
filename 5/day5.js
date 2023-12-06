
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

    solve_part2 (input) {
        let minLocation = Number.MAX_SAFE_INTEGER;
        this.almanac = this.convertToAlmanac(input)

        let seeds = this.almanac.seedToSoil
            .sort((a, b) => a.src - b.src)
            .map(x => (
                {
                    start: x.src,
                    end: x.src + x.len,
                    startLocation: this.seed2Location(x.src),
                    endLocation: this.seed2Location(x.src + x.len)
                }
            ));

        for (let i = 0; i < this.almanac.seeds.length; i += 2) {
            let start = this.almanac.seeds[i];
            let end = parseInt(start) + parseInt(this.almanac.seeds[i + 1]) - 1;

            console.log(`Check from ${start} to ${end}`);
            for(let j = 0; j < seeds.length; j++) {
                let overlap = Math.min(end, seeds[j].end) - Math.max(start, seeds[j].start);
                if (overlap >= 0) {

                    let overLapStart = start >= seeds[j].start ? start : seeds[j].start;
                    let overLapEnd = end <= seeds[j].end ? end : seeds[j].end;

                    for(let k = overLapStart; k <= overLapEnd; k++) {
                        let location= this.seed2Location(k);
                        if(location < minLocation) {
                            minLocation = location;
                        }
                    }

                    break;
                }
            }
        }

        return minLocation
    }
}

module.exports = new Challenge();