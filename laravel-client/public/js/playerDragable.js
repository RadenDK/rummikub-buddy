/**
 * Adds drag-and-drop functionality to the player columns.
 */
export function initializeColumnDragging() {
    const playerRow = document.getElementById('player-row');
    const roundsBody = document.getElementById('rounds-body');
    const totalsRow = document.getElementById('totals-row');

    Sortable.create(playerRow, {
        animation: 150,
        // Only allow <th> elements that are NOT #static-header to be draggable
        draggable: 'th:not(#static-header)',

        // Called when an element is about to be moved
        onMove(event) {
            // `event.draggedIndex` = the original index of the dragged column
            // `event.relatedIndex` = the target index if the drop is successful
            const targetIndex = event.relatedIndex;

            // # column is at index 0. If targetIndex is 0, disallow
            // If you want to also block dropping into index 1, do if (targetIndex < 1) { ... }
            if (targetIndex === 0) {
                return false; // Disallow the drop
            }

            // Otherwise, allow
            return true;
        },

        // Called once the drag operation ends (drop event)
        onEnd(event) {
            const draggedIndex = event.oldIndex;
            const targetIndex = event.newIndex;

            // If the drop didn’t actually change positions or is at index 0, do nothing
            if (draggedIndex === targetIndex || targetIndex === 0) {
                return;
            }

            // Reorder the cells in each row of the table’s body
            Array.from(roundsBody.rows).forEach((row) => {
                const cells = Array.from(row.children);
                // Remove the dragged cell
                const draggedCell = cells.splice(draggedIndex, 1)[0];
                // Insert it at the new position
                cells.splice(targetIndex, 0, draggedCell);

                // Clear the row and re-append the cells in the updated order
                row.innerHTML = '';
                cells.forEach((cell) => row.appendChild(cell));
            });

            // Reorder the cells in the totals row
            const totalsCells = Array.from(totalsRow.children);
            const draggedTotalCell = totalsCells.splice(draggedIndex, 1)[0];
            totalsCells.splice(targetIndex, 0, draggedTotalCell);

            totalsRow.innerHTML = '';
            totalsCells.forEach((cell) => totalsRow.appendChild(cell));
        },
    });
}