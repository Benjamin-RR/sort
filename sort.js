/**
 * Sorts packages based on volume and mass criteria
 * @param {number} width - Width in centimeters
 * @param {number} height - Height in centimeters  
 * @param {number} length - Length in centimeters
 * @param {number} mass - Mass in kilograms
 * @returns {string} - "STANDARD", "SPECIAL", or "REJECTED"
 */
function sort(width, height, length, mass) {
    // Helper function to check if a value is a valid positive number
    const isValidDimension = (value) => {
        return typeof value === 'number' && 
            !isNaN(value) && 
            isFinite(value) && 
            value > 0;
    };
    
    const isValidMass = (value) => {
        return typeof value === 'number' && 
            !isNaN(value) && 
            isFinite(value) && 
            value > 0;
    };
    
    // Check if all arguments are provided and valid
    if (!isValidDimension(width) || 
        !isValidDimension(height) || 
        !isValidDimension(length) || 
        !isValidMass(mass)) {
        return "REJECTED";
    }
    
    // Check if any dimension is >= 150 cm (bulky condition)
    const hasLargeDimension = width >= 150 || height >= 150 || length >= 150;
    
    // Calculate volume (Width x Height x Length)
    const volume = width * height * length;
    const isBulkyByVolume = volume > 1000000; // Greater than 1,000,000 cm³ (not >=)
    
    // Check if package is bulky (either by dimension or volume)
    const isBulky = hasLargeDimension || isBulkyByVolume;
    
    // Check if package is heavy (mass >= 20 kg)
    const isHeavy = mass >= 20;
    
    // Determine sorting based on rules
    if (isBulky && isHeavy) {
        return "REJECTED"; // Both bulky and heavy
    } else if (isBulky || isHeavy) {
        return "SPECIAL"; // Either bulky or heavy
    } else {
        return "STANDARD"; // Neither bulky nor heavy
    }
}

// Command line interface
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length !== 4) {
        console.log('Usage: node sort.js <width> <height> <length> <mass>');
        console.log('Example: node sort.js 100 100 100 10');
        process.exit(1);
    }
    
    const [width, height, length, mass] = args.map(arg => {
        const num = parseFloat(arg);
        if (isNaN(num)) {
            console.log(`Error: "${arg}" is not a valid number`);
            process.exit(1);
        }
        return num;
    });
    
    const result = sort(width, height, length, mass);
    console.log(result);
} else {
    // Export the function for testing
    module.exports = { sort };
}
