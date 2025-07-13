#!/bin/bash

# Function to convert TypeScript syntax to JavaScript
convert_ts_to_js() {
    local file="$1"
    
    # Remove TypeScript type annotations
    sed -i 's/: NextRequest//g' "$file"
    sed -i 's/: NextResponse//g' "$file"
    sed -i 's/: any//g' "$file"
    sed -i 's/: string//g' "$file"
    sed -i 's/: number//g' "$file"
    sed -i 's/: boolean//g' "$file"
    sed -i 's/: object//g' "$file"
    sed -i 's/: Array<[^>]*>//g' "$file"
    sed -i 's/: [a-zA-Z_][a-zA-Z0-9_]*\[\]//g' "$file"
    sed -i 's/: [a-zA-Z_][a-zA-Z0-9_]*<[^>]*>//g' "$file"
    sed -i 's/: [a-zA-Z_][a-zA-Z0-9_]*//g' "$file"
    
    # Remove interface and type imports
    sed -i '/import.*{.*NextRequest.*}/s/NextRequest[, ]*//g' "$file"
    sed -i '/import.*{.*TrainBotEntryType.*}/s/TrainBotEntryType[, ]*//g' "$file"
    sed -i 's/import { NextRequest, NextResponse }/import { NextResponse }/g' "$file"
    sed -i 's/import { NextRequest }/\/\/ NextRequest removed/g' "$file"
    
    # Clean up empty import braces
    sed -i 's/import { *} from/\/\/ Empty import removed from/g' "$file"
    
    echo "Converted: $file"
}

# Find all JavaScript files in linkedInBots directory and convert them
find "src/app/api/linkedInBots" -name "*.js" -type f | while read file; do
    convert_ts_to_js "$file"
done

echo "Conversion completed!"
