import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function PropertyRooms () {
    return (
        <SimpleTreeView
        defaultExpandedItems={['b1']}
        slots={{                    // иконки разворота/свёртывания
          collapseIcon: ExpandMoreIcon,
          expandIcon: ChevronRightIcon,
        }}
        sx={{ maxHeight: 480, overflow: 'auto' }}
      >
        <TreeItem itemId="b1" label="Корпус A">
          <TreeItem itemId="f1" label="Этаж 1"><p>test</p></TreeItem>
          <TreeItem itemId="f2" label="Этаж 2" />
        </TreeItem>
        <TreeItem itemId="z1" label="Зона: Лес" />
      </SimpleTreeView>
    )
}