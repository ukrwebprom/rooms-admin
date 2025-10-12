import { useMemo, useState } from 'react';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {sortTreePreorder} from './SortLocations';

// ожидает props: { locations, onSelect }
// locations: [{ id, parent_id, name, kind, code, ... }]
// sortTreePreorder(items, { idKey:'id', parentKey:'parent_id', comparator? })

export default function LocationsTree({ locations = [], onSelect }) {
  const [selected, setSelected] = useState(null);

  // 1) pre-order сортировка
  const sorted = useMemo(
    () => sortTreePreorder(locations, { idKey: 'id', parentKey: 'parent_id' }),
    [locations]
  );

  // 2) строим индекс: parent -> [children]
  const { roots, byParent } = useMemo(() => {
    const map = new Map(); // parentId -> children[]
    const ids = new Set(sorted.map((n) => n.id));

    for (const n of sorted) {
      const p = n.parent_id ?? null;
      if (!map.has(p)) map.set(p, []);
      map.get(p).push(n);
    }

    // корни: нет parent'а или родителя нет в списке
    const rts = sorted.filter((n) => !n.parent_id || !ids.has(n.parent_id));

    return { roots: rts, byParent: map };
  }, [sorted]);

  // 3) рекурсивный рендер
  const renderNode = (node) => (
    <TreeItem key={node.id} itemId={node.id} label={node.name}>
      {(byParent.get(node.id) || []).map(renderNode)}
    </TreeItem>
  );

  return (
    <SimpleTreeView
      selectedItems={selected ? [selected] : []}
      onSelectedItemsChange={(_, ids) => {
        const id = Array.isArray(ids) ? ids[0] : ids; 
        setSelected(id);
        // const node = locations.find(x => String(x.id) === String(id));
        onSelect?.(id);
      }}
      defaultExpandedItems={roots.map((r) => r.id)}
      slots={{
        collapseIcon: ExpandMoreIcon,
        expandIcon: ChevronRightIcon,
      }}
      sx={{ maxHeight: 480, overflow: 'auto' }}
    >
      {roots.map(renderNode)}
    </SimpleTreeView>
  );
}
