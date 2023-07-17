"use client"

import { Table, TableContainer, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';
import { useState } from 'react';

type DataTableProps = {
    headers: string[];
    caption?: string;
    sorting?: boolean;
    pagination?: boolean;
};

const DataTable: React.FC<DataTableProps> = ({
    headers,
    caption,
    sorting,
    pagination,
}) => {
    // State variables
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);

    // Handle column sorting
    const handleSort = (column: string) => {
        if (sorting) {
            if (sortColumn === column) {
                setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
            } else {
                setSortColumn(column);
                setSortDirection('asc');
            }
        }
    };

    // Render table headers
    const renderHeaders = () => {
        return (
            <Tr>
                {headers.map((header, index) => (
                    <Th
                        key={index}
                        cursor={sorting ? 'pointer' : 'default'}
                        onClick={() => handleSort(header)}
                    >
                        {header}
                    </Th>
                ))}
            </Tr>
        );
    };

    // Render table rows
    const renderRows = () => {
        // Replace this with your API data or mock data
        const rows = [
            ['2023-07-15', '123', 'example@example.com', 'John Doe', 'Website', 'Confirmed','select'],
            ['2023-07-14', '456', 'test@test.com', 'Jane Smith', 'Mobile App', 'Pending', 'select'],
            ['2023-07-16', '456', 'another@example.com', 'Jane Smith', 'App', 'Confirmed', 'select'],
            ['2023-07-17', '789', 'test@example.com', 'Alex Johnson', 'Mobile', 'Confirmed', 'select'],
            ['2023-07-18', '987', 'sample@example.com', 'Sarah Thompson', 'Web App', 'Confirmed', 'select'],
            ['2023-07-19', '654', 'email@example.com', 'Michael Brown', 'Website', 'Confirmed', 'select'],
            ['2023-07-20', '321', 'demo@example.com', 'Emily Davis', 'Mobile App', 'Confirmed', 'select']
        ];

        // Sort rows if sorting is enabled
        const sortedRows = sorting
            ? [...rows].sort((a, b) => {
                const columnIndex = headers.indexOf(sortColumn!);
                return sortDirection === 'asc'
                    ? a[columnIndex].localeCompare(b[columnIndex])
                    : b[columnIndex].localeCompare(a[columnIndex]);
            })
            : rows;

        // Pagination logic
        const itemsPerPage = 5;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const visibleRows = sortedRows.slice(startIndex, startIndex + itemsPerPage);

        return visibleRows.map((row, index) => (
            <Tr key={index}>
                {row.map((cell, cellIndex) => (
                    <Td key={cellIndex}>{cell}</Td>
                ))}
            </Tr>
        ));
    };

    return (
        <TableContainer>
            <Table variant='striped' colorScheme='teal'>
                {caption && (
                    <caption>
                        <Text fontWeight="bold">{caption}</Text>
                    </caption>
                )}
                <Thead>{renderHeaders()}</Thead>
                <Tbody>{renderRows()}</Tbody>
            </Table>
        </TableContainer>
    );
};

export default DataTable;
