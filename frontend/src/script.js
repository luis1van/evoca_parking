const assinger = function(garage,destination){
        
        let relativeMod, distance, spot = 1000
        let [letter,number]= destination.split("")
        let building = letter.toLowerCase().charCodeAt(0) - 97
        let side = parseInt(number) === 1 ? 0 : -1
        let location = { row: -1, col: 1000 }

        for(let i=0; i <= 5 ;i++){
            relativeMod = Math.abs(i - building) 
            distance = side + 1 ? garage[i].at(side)+ relativeMod : 4 - garage[i].at(side) + relativeMod
            if(spot > distance){
                location.row = i
                location.col = side + 1 ? distance - relativeMod : 4 - distance + relativeMod
                spot = distance
            }
        }
        
        return location;
    }
export default assinger
