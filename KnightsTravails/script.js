function knightMoves(start, end) {
    const possibleMoves = [
        [2, 1], [2, -1], [-2, 1], [-2, -1],
        [1, 2], [1, -2], [-1, 2], [-1, -2]
    ];

    const isValid = (x, y) => x >= 0 && x < 8 && y >= 0 && y < 8;

    // Queue stores: [currentX, currentY, path_array]
    const queue = [[start[0], start[1], [start]]];

    // Visited set using string keys (e.g., "0,0")
    const visited = new Set(`${start[0]},${start[1]}`);

    if (start[0] === end[0] && start[1] === end[1]) {
        console.log(`> knightMoves([${start}], [${end}])`);
        console.log(`=> You made it in 0 moves! Here's your path:`);
        console.log(`  [${start}]`);
        return [start];
    }

    while (queue.length > 0) {
        const [currentX, currentY, path] = queue.shift();

        for (const [dx, dy] of possibleMoves) {
            const nextX = currentX + dx;
            const nextY = currentY + dy;
            const nextCoord = [nextX, nextY];
            const key = `${nextX},${nextY}`;

            if (isValid(nextX, nextY) && !visited.has(key)) {
                if (nextX === end[0] && nextY === end[1]) {
                    const finalPath = [...path, nextCoord];
                    const moves = finalPath.length - 1;
                    
                    // Output the result
                    console.log(`> knightMoves([${start}], [${end}])`);
                    console.log(`=> You made it in ${moves} moves! Here's your path:`);
                    finalPath.forEach(coord => console.log(`  [${coord}]`));
                    
                    return finalPath;
                }

                visited.add(key);
                const newPath = [...path, nextCoord];
                queue.push([nextX, nextY, newPath]);
            }
        }
    }
    
    return []; 
}