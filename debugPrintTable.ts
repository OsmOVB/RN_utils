const printTable = (items: any[], maxColumns: number = 8) => {
  if (items.length === 0) return;
  clear();

  const headers = Object.keys(items[0]);
  const numTables = Math.ceil(headers.length / maxColumns);

  for (let t = 0; t < numTables; t++) {
    const start = t * maxColumns;
    const end = start + maxColumns;
    const tableHeaders = headers.slice(start, end);

    // Calculate the maximum length of the values in each column
    const columnWidths = tableHeaders.map(header => 
      Math.max(header.length, ...items.map(item => 
        (item[header] ?? 'null').toString().length
      ))
    );

    // Print the headers, padded to their column width
    console.log('| ' + tableHeaders.map((header, i) => header.padEnd(columnWidths[i])).join(' | ') + ' |');

    // Print a line to separate the headers from the data
    console.log('|-' + columnWidths.map(width => '-'.repeat(width)).join('-|-') + '-|');

    // Print the items, padded to their column width
    items.forEach(item => {
      console.log('| ' + tableHeaders.map((header, i) => 
        (item[header] ?? 'null').toString().padEnd(columnWidths[i])
      ).join(' | ') + ' |');
    });

    console.log("\n");
  }
};

const clear = () => {
  console.log('\x1Bc');
}


export const debug = {
  clear,
  printTable
}