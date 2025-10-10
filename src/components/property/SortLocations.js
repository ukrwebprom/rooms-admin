/**
 * Преобразует плоский список локаций в порядок pre-order:
 * корень -> все его потомки -> следующий корень ...
 *
 * @param {Array<object>} items
 * @param {object} opts
 * @param {string} opts.idKey       - имя поля id (по умолчанию 'id')
 * @param {string} opts.parentKey   - имя поля parent_id (по умолчанию 'parent_id')
 * @param {(a:object,b:object)=>number} opts.comparator - как сортировать сиблингов
 */
export function sortTreePreorder(
    items,
    {
      idKey = 'id',
      parentKey = 'parent_id',
      comparator = (a, b) =>
        String(a.name ?? '').localeCompare(String(b.name ?? ''), undefined, { numeric: true }),
    } = {}
  ) {
    if (!Array.isArray(items) || items.length === 0) return [];
  
    const byId = new Map();
    const children = new Map(); // parentId -> [child, ...]
  
    for (const it of items) {
      const id = it[idKey];
      const p  = it[parentKey] ?? null;
      byId.set(id, it);
      if (!children.has(p)) children.set(p, []);
      children.get(p).push(it);
    }
  
    // сортируем детей у каждого родителя
    for (const arr of children.values()) arr.sort(comparator);
  
    // корни: parent_id === null ИЛИ их родителя нет в списке (осиротевшие)
    const roots = [];
    for (const it of items) {
      const p = it[parentKey] ?? null;
      if (p === null || !byId.has(p)) roots.push(it);
    }
    roots.sort(comparator);
  
    const res = [];
    const seen = new Set();
  
    const dfs = (node) => {
      const id = node?.[idKey];
      if (!id || seen.has(id)) return;
      seen.add(id);
      res.push(node);
      const kids = children.get(id) || [];
      for (const k of kids) dfs(k);
    };
  
    for (const r of roots) dfs(r);
  
    // На всякий случай добираем оставшиеся (если где-то циклы/битые связи)
    if (res.length !== items.length) {
      for (const it of items) if (!seen.has(it[idKey])) dfs(it);
    }
    return res;
  }
  