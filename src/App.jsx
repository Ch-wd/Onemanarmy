import React, { useEffect, useMemo, useState } from 'react';

const APP_CSS = `
:root {
  --bg: #f4f6fb;
  --surface: #ffffff;
  --surface-2: #f8fafc;
  --text: #0f172a;
  --muted: #64748b;
  --border: #e2e8f0;
  --primary: #4f46e5;
  --primary-soft: #eef2ff;
  --target: #d97706;
  --target-soft: #fef3c7;
  --idea: #7c3aed;
  --idea-soft: #f3e8ff;
  --task: #059669;
  --task-soft: #d1fae5;
  --node: #0284c7;
  --node-soft: #e0f2fe;
  --danger: #dc2626;
}

* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.45;
}

.app-shell {
  min-height: 100vh;
  padding-bottom: calc(28px + var(--safe-area-inset-bottom, env(safe-area-inset-bottom, 0px)));
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: var(--primary);
  color: #ffffff;
  padding: calc(12px + var(--safe-area-inset-top, env(safe-area-inset-top, 0px))) 14px 12px;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.14);
}

.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  max-width: 900px;
  margin: 0 auto;
}

.brand {
  font-size: 1.15rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.pill-switch {
  display: flex;
  background: rgba(255, 255, 255, 0.16);
  border-radius: 10px;
  padding: 3px;
}

.pill-switch button {
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.88);
  padding: 6px 10px;
  border-radius: 7px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
}

.pill-switch button.active {
  background: #ffffff;
  color: var(--primary);
}

.icon-btn-header {
  border: 1px solid rgba(255, 255, 255, 0.32);
  background: rgba(255, 255, 255, 0.14);
  color: #ffffff;
  border-radius: 8px;
  padding: 6px 9px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 12px;
}

.breadcrumbs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
  font-size: 0.86rem;
}

.crumb-btn {
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
}

.crumb-btn.current {
  background: var(--primary-soft);
  color: var(--primary);
  border-color: #c7d2fe;
}

.crumb-sep {
  color: var(--muted);
  font-weight: 700;
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
}

.node-hero {
  border-left: 5px solid var(--primary);
}

.node-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.node-title {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
  word-break: break-word;
}

.node-sub {
  margin-top: 4px;
  font-size: 0.78rem;
  color: var(--muted);
}

.stats-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}

.badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 999px;
}

.badge-target { background: var(--target-soft); color: #92400e; }
.badge-idea { background: var(--idea-soft); color: #5b21b6; }
.badge-task { background: var(--task-soft); color: #065f46; }
.badge-node { background: var(--node-soft); color: #075985; }

.filter-bar {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 4px;
  margin-bottom: 12px;
}

.filter-tab {
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--muted);
  padding: 7px 12px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
}

.filter-tab.active {
  background: var(--text);
  color: #ffffff;
  border-color: var(--text);
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.section-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
}

.add-form {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.input {
  flex: 1;
  min-width: 0;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  font-size: 0.94rem;
  background: var(--surface-2);
  color: var(--text);
}

.input:focus {
  outline: 2px solid #c7d2fe;
  border-color: var(--primary);
  background: #ffffff;
}

.btn {
  border: none;
  border-radius: 10px;
  padding: 9px 14px;
  font-size: 0.86rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.btn-primary { background: var(--primary); color: #ffffff; }
.btn-target { background: var(--target); color: #ffffff; }
.btn-idea { background: var(--idea); color: #ffffff; }
.btn-task { background: var(--task); color: #ffffff; }
.btn-node { background: var(--node); color: #ffffff; }
.btn-ghost { background: var(--surface-2); color: var(--text); border: 1px solid var(--border); }
.btn-danger { background: #fee2e2; color: var(--danger); }

.btn-sm {
  padding: 5px 9px;
  font-size: 0.78rem;
  border-radius: 8px;
}

.item-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface-2);
}

.check-btn {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 2px solid #94a3b8;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 700;
}

.check-btn.done {
  background: var(--task);
  border-color: var(--task);
  color: #ffffff;
}

.check-btn.target-done {
  background: var(--target);
  border-color: var(--target);
  color: #ffffff;
}

.item-text {
  flex: 1;
  min-width: 0;
  font-size: 0.93rem;
  word-break: break-word;
}

.item-text.done {
  text-decoration: line-through;
  color: var(--muted);
}

.item-actions {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.subnode-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}

@media (min-width: 600px) {
  .subnode-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.subnode-card {
  border: 1px solid #bae6fd;
  background: #f0f9ff;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
}

.subnode-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.subnode-name {
  font-weight: 700;
  font-size: 1rem;
  color: #0c4a6e;
  word-break: break-word;
}

.empty-note {
  margin: 4px 0;
  font-size: 0.85rem;
  color: var(--muted);
}

.tree-viewport {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 18px 12px;
  overflow: auto;
  min-height: 62vh;
}

.tree-canvas {
  width: max-content;
  min-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.tree-node-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tree-box {
  background: #ffffff;
  border: 2px solid #cbd5e1;
  border-radius: 12px;
  padding: 10px 12px;
  min-width: 145px;
  max-width: 210px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.06);
  cursor: pointer;
}

.tree-box.active-node {
  border-color: var(--primary);
  background: var(--primary-soft);
}

.tree-box.root-node {
  border-color: var(--node);
}

.tree-box-title {
  font-weight: 700;
  font-size: 0.9rem;
  word-break: break-word;
  margin-bottom: 6px;
}

.tree-box-meta {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4px;
  font-size: 0.72rem;
}

.tree-box-actions {
  margin-top: 7px;
  display: flex;
  justify-content: center;
  gap: 6px;
}

.tree-children {
  display: flex;
  justify-content: center;
  position: relative;
  padding-top: 20px;
}

.tree-children::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 0;
  height: 20px;
  border-left: 2px solid #cbd5e1;
  transform: translateX(-1px);
}

.tree-branch {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 20px 8px 0 8px;
}

.tree-branch::before,
.tree-branch::after {
  content: '';
  position: absolute;
  top: 0;
  right: 50%;
  border-top: 2px solid #cbd5e1;
  width: 50%;
  height: 20px;
}

.tree-branch::after {
  right: auto;
  left: 50%;
  border-left: 2px solid #cbd5e1;
}

.tree-branch:first-child::before {
  border: 0 none;
}

.tree-branch:last-child::after {
  border-top: 0 none;
}

.tree-branch:only-child {
  padding-top: 0;
}

.tree-branch:only-child::before,
.tree-branch:only-child::after {
  display: none;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.modal-card {
  width: 100%;
  max-width: 460px;
  background: var(--surface);
  border-radius: 16px;
  padding: 18px;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.25);
}

.textarea {
  width: 100%;
  min-height: 110px;
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: 10px;
  font-family: monospace;
  font-size: 0.78rem;
  resize: vertical;
  margin-top: 8px;
}
`;

const DB_NAME = 'thoughtTreeDB';
const DB_VERSION = 1;
const STORE_NAME = 'store';
const TREE_KEY = 'mainTree';
const LS_FALLBACK_KEY = 'thoughtTreeFallbackV1';

const uid = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

function createInitialTree() {
  const rootId = 'root-central';
  return {
    rootId,
    nodes: {
      [rootId]: {
        id: rootId,
        parentId: null,
        name: 'Central Node',
        targets: [],
        ideas: [],
        tasks: [],
        childrenIds: [],
        createdAt: Date.now()
      }
    }
  };
}

function openDB() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB unavailable'));
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function loadTreeFromDevice() {
  try {
    const db = await openDB();
    const data = await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get(TREE_KEY);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    if (data && data.rootId && data.nodes && data.nodes[data.rootId]) {
      return data;
    }
  } catch (_) {}

  try {
    const raw = localStorage.getItem(LS_FALLBACK_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.rootId && parsed.nodes && parsed.nodes[parsed.rootId]) {
        return parsed;
      }
    }
  } catch (_) {}

  return createInitialTree();
}

async function saveTreeToDevice(tree) {
  try {
    localStorage.setItem(LS_FALLBACK_KEY, JSON.stringify(tree));
  } catch (_) {}

  try {
    const db = await openDB();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(tree, TREE_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (_) {}
}

function TreeBranch({
  nodeId,
  nodes,
  rootId,
  currentNodeId,
  collapsed,
  onToggleCollapse,
  onSelectNode
}) {
  const node = nodes[nodeId];
  if (!node) return null;

  const isCollapsed = !!collapsed[nodeId];
  const hasChildren = node.childrenIds.length > 0;
  const doneTasks = node.tasks.filter((t) => t.done).length;

  return (
    <div className="tree-node-wrap">
      <div
        className={`tree-box ${nodeId === currentNodeId ? 'active-node' : ''} ${
          nodeId === rootId ? 'root-node' : ''
        }`}
        onClick={() => onSelectNode(nodeId)}
      >
        <div className="tree-box-title">{node.name}</div>
        <div className="tree-box-meta">
          <span>🎯 {node.targets.length}</span>
          <span>💡 {node.ideas.length}</span>
          <span>
            ✅ {doneTasks}/{node.tasks.length}
          </span>
        </div>
        {hasChildren && (
          <div className="tree-box-actions">
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                onToggleCollapse(nodeId);
              }}
            >
              {isCollapsed ? `+ ${node.childrenIds.length} sub` : '− Collapse'}
            </button>
          </div>
        )}
      </div>

      {hasChildren && !isCollapsed && (
        <div className="tree-children">
          {node.childrenIds.map((childId) => (
            <div key={childId} className="tree-branch">
              <TreeBranch
                nodeId={childId}
                nodes={nodes}
                rootId={rootId}
                currentNodeId={currentNodeId}
                collapsed={collapsed}
                onToggleCollapse={onToggleCollapse}
                onSelectNode={onSelectNode}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ItemSection({
  title,
  icon,
  type,
  items,
  placeholder,
  btnClass,
  checkable,
  targetStyle,
  onAdd,
  onToggle,
  onEdit,
  onDelete
}) {
  const [draft, setDraft] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = draft.trim();
    if (!clean) return;
    onAdd(type, clean);
    setDraft('');
  };

  const saveEdit = (id) => {
    const clean = editingText.trim();
    if (clean) {
      onEdit(type, id, clean);
    }
    setEditingId(null);
    setEditingText('');
  };

  return (
    <div className="card">
      <div className="section-head">
        <h3 className="section-title">
          <span>{icon}</span>
          <span>{title}</span>
          <span className="node-sub">({items.length})</span>
        </h3>
      </div>

      <form className="add-form" onSubmit={handleSubmit}>
        <input
          className="input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={placeholder}
        />
        <button type="submit" className={`btn ${btnClass}`}>
          + Add
        </button>
      </form>

      {items.length === 0 ? (
        <p className="empty-note">Nothing added yet.</p>
      ) : (
        <div className="item-list">
          {items.map((item) => (
            <div key={item.id} className="item-row">
              {checkable && (
                <button
                  type="button"
                  aria-label="Toggle status"
                  className={`check-btn ${
                    item.done ? (targetStyle ? 'target-done' : 'done') : ''
                  }`}
                  onClick={() => onToggle(type, item.id)}
                >
                  {item.done ? '✓' : ''}
                </button>
              )}

              {editingId === item.id ? (
                <div style={{ flex: 1, display: 'flex', gap: 6 }}>
                  <input
                    className="input"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit(item.id);
                      if (e.key === 'Escape') setEditingId(null);
                    }}
                    autoFocus
                  />
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => saveEdit(item.id)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className={`item-text ${item.done ? 'done' : ''}`}>
                  {item.text}
                </div>
              )}

              {editingId !== item.id && (
                <div className="item-actions">
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      setEditingId(item.id);
                      setEditingText(item.text);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(type, item.id)}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [tree, setTree] = useState(null);
  const [currentNodeId, setCurrentNodeId] = useState('root-central');
  const [view, setView] = useState('focus');
  const [tab, setTab] = useState('all');
  const [renaming, setRenaming] = useState(false);
  const [renameText, setRenameText] = useState('');
  const [subNodeDraft, setSubNodeDraft] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [collapsed, setCollapsed] = useState({});
  const [backupOpen, setBackupOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [backupMsg, setBackupMsg] = useState('');

  useEffect(() => {
    loadTreeFromDevice().then((loaded) => {
      setTree(loaded);
      setCurrentNodeId(loaded.rootId);
      try {
        window.history.replaceState({ nodeId: loaded.rootId }, '');
      } catch (_) {}
    });
  }, []);

  useEffect(() => {
    if (!tree) return;
    saveTreeToDevice(tree);
  }, [tree]);

  useEffect(() => {
    const onPopState = (e) => {
      if (e.state?.nodeId && tree?.nodes?.[e.state.nodeId]) {
        setCurrentNodeId(e.state.nodeId);
        setRenaming(false);
        setConfirmDeleteId(null);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [tree]);

  const currentNode = tree?.nodes?.[currentNodeId] || tree?.nodes?.[tree?.rootId];

  const breadcrumbs = useMemo(() => {
    if (!tree || !currentNode) return [];
    const trail = [];
    let cursor = currentNode;
    const guard = new Set();
    while (cursor && !guard.has(cursor.id)) {
      guard.add(cursor.id);
      trail.unshift(cursor);
      cursor = cursor.parentId ? tree.nodes[cursor.parentId] : null;
    }
    return trail;
  }, [tree, currentNode]);

  if (!tree || !currentNode) {
    return (
      <div className="app-shell">
        <style>{APP_CSS}</style>
        <div className="container">Loading ThoughtTree...</div>
      </div>
    );
  }

  const navigateTo = (nodeId) => {
    if (!tree.nodes[nodeId]) return;
    setCurrentNodeId(nodeId);
    setRenaming(false);
    setConfirmDeleteId(null);
    setView('focus');
    try {
      window.history.pushState({ nodeId }, '');
    } catch (_) {}
  };

  const handleRenameNode = (e) => {
    e.preventDefault();
    const clean = renameText.trim();
    if (!clean) return;
    setTree((prev) => ({
      ...prev,
      nodes: {
        ...prev.nodes,
        [currentNode.id]: {
          ...prev.nodes[currentNode.id],
          name: clean
        }
      }
    }));
    setRenaming(false);
  };

  const handleAddItem = (type, text) => {
    const newItem =
      type === 'ideas'
        ? { id: uid(), text, createdAt: Date.now() }
        : { id: uid(), text, done: false, createdAt: Date.now() };

    setTree((prev) => ({
      ...prev,
      nodes: {
        ...prev.nodes,
        [currentNode.id]: {
          ...prev.nodes[currentNode.id],
          [type]: [...prev.nodes[currentNode.id][type], newItem]
        }
      }
    }));
  };

  const handleToggleItem = (type, itemId) => {
    setTree((prev) => ({
      ...prev,
      nodes: {
        ...prev.nodes,
        [currentNode.id]: {
          ...prev.nodes[currentNode.id],
          [type]: prev.nodes[currentNode.id][type].map((it) =>
            it.id === itemId ? { ...it, done: !it.done } : it
          )
        }
      }
    }));
  };

  const handleEditItem = (type, itemId, newText) => {
    setTree((prev) => ({
      ...prev,
      nodes: {
        ...prev.nodes,
        [currentNode.id]: {
          ...prev.nodes[currentNode.id],
          [type]: prev.nodes[currentNode.id][type].map((it) =>
            it.id === itemId ? { ...it, text: newText } : it
          )
        }
      }
    }));
  };

  const handleDeleteItem = (type, itemId) => {
    setTree((prev) => ({
      ...prev,
      nodes: {
        ...prev.nodes,
        [currentNode.id]: {
          ...prev.nodes[currentNode.id],
          [type]: prev.nodes[currentNode.id][type].filter((it) => it.id !== itemId)
        }
      }
    }));
  };

  const handleAddSubNode = (e) => {
    e.preventDefault();
    const clean = subNodeDraft.trim();
    if (!clean) return;
    const newId = uid();
    setTree((prev) => ({
      ...prev,
      nodes: {
        ...prev.nodes,
        [newId]: {
          id: newId,
          parentId: currentNode.id,
          name: clean,
          targets: [],
          ideas: [],
          tasks: [],
          childrenIds: [],
          createdAt: Date.now()
        },
        [currentNode.id]: {
          ...prev.nodes[currentNode.id],
          childrenIds: [...prev.nodes[currentNode.id].childrenIds, newId]
        }
      }
    }));
    setSubNodeDraft('');
  };

  const handleDeleteNode = (targetId) => {
    if (targetId === tree.rootId) return;
    const targetNode = tree.nodes[targetId];
    if (!targetNode) return;
    const fallbackId = targetNode.parentId || tree.rootId;

    setTree((prev) => {
      const nextNodes = { ...prev.nodes };
      const collect = (id) => {
        const n = nextNodes[id];
        if (!n) return;
        n.childrenIds.forEach(collect);
        delete nextNodes[id];
      };
      collect(targetId);

      if (targetNode.parentId && nextNodes[targetNode.parentId]) {
        nextNodes[targetNode.parentId] = {
          ...nextNodes[targetNode.parentId],
          childrenIds: nextNodes[targetNode.parentId].childrenIds.filter(
            (cid) => cid !== targetId
          )
        };
      }
      return { ...prev, nodes: nextNodes };
    });

    setConfirmDeleteId(null);
    if (currentNodeId === targetId) {
      setCurrentNodeId(fallbackId);
    }
  };

  const handleExportDownload = () => {
    const json = JSON.stringify(tree, null, 2);
    try {
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `thoughttree-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setBackupMsg('Backup downloaded!');
    } catch (_) {
      setImportText(json);
      setBackupMsg('Copied JSON below.');
    }
  };

  const handleCopyJson = async () => {
    const json = JSON.stringify(tree, null, 2);
    setImportText(json);
    try {
      await navigator.clipboard.writeText(json);
      setBackupMsg('JSON copied to clipboard!');
    } catch (_) {
      setBackupMsg('JSON shown below — select and copy it.');
    }
  };

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(importText);
      if (!parsed || !parsed.rootId || !parsed.nodes || !parsed.nodes[parsed.rootId]) {
        setBackupMsg('Invalid backup JSON format.');
        return;
      }
      setTree(parsed);
      setCurrentNodeId(parsed.rootId);
      setBackupMsg('Backup restored!');
      setBackupOpen(false);
    } catch (_) {
      setBackupMsg('Could not parse JSON. Check your text.');
    }
  };

  const handleResetTree = () => {
    const fresh = createInitialTree();
    setTree(fresh);
    setCurrentNodeId(fresh.rootId);
    setBackupMsg('Reset to a fresh Central Node.');
    setBackupOpen(false);
  };

  const doneTasksCount = currentNode.tasks.filter((t) => t.done).length;
  const doneTargetsCount = currentNode.targets.filter((t) => t.done).length;

  return (
    <div className="app-shell">
      <style>{APP_CSS}</style>
      <header className="app-header">
        <div className="header-row">
          <div className="brand">🌳 ThoughtTree</div>
          <div className="header-actions">
            <div className="pill-switch">
              <button
                type="button"
                className={view === 'focus' ? 'active' : ''}
                onClick={() => setView('focus')}
              >
                Focus
              </button>
              <button
                type="button"
                className={view === 'tree' ? 'active' : ''}
                onClick={() => setView('tree')}
              >
                Tree Map
              </button>
            </div>
            <button
              type="button"
              className="icon-btn-header"
              onClick={() => {
                setBackupMsg('');
                setBackupOpen(true);
              }}
            >
              Backup
            </button>
          </div>
        </div>
      </header>

      <main className="container">
        {view === 'tree' ? (
          <div className="tree-viewport">
            <p className="empty-note" style={{ textAlign: 'center', marginBottom: 14 }}>
              Tap any node to open it. Scroll horizontally or vertically to explore.
            </p>
            <div className="tree-canvas">
              <TreeBranch
                nodeId={tree.rootId}
                nodes={tree.nodes}
                rootId={tree.rootId}
                currentNodeId={currentNode.id}
                collapsed={collapsed}
                onToggleCollapse={(id) =>
                  setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }))
                }
                onSelectNode={navigateTo}
              />
            </div>
          </div>
        ) : (
          <>
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.id}>
                  {idx > 0 && <span className="crumb-sep">›</span>}
                  <button
                    type="button"
                    className={`crumb-btn ${
                      crumb.id === currentNode.id ? 'current' : ''
                    }`}
                    onClick={() => navigateTo(crumb.id)}
                  >
                    {idx === 0 ? `🌳 ${crumb.name}` : crumb.name}
                  </button>
                </React.Fragment>
              ))}
            </nav>

            <section className="card node-hero">
              {renaming ? (
                <form className="add-form" onSubmit={handleRenameNode}>
                  <input
                    className="input"
                    value={renameText}
                    onChange={(e) => setRenameText(e.target.value)}
                    placeholder="Node name"
                    autoFocus
                  />
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setRenaming(false)}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <div className="node-title-row">
                  <div>
                    <h1 className="node-title">{currentNode.name}</h1>
                    <div className="node-sub">
                      {currentNode.id === tree.rootId
                        ? 'Central Root Node'
                        : `Sub-node of ${
                            tree.nodes[currentNode.parentId]?.name || 'Parent'
                          }`}
                    </div>
                  </div>
                  <div className="item-actions">
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={() => {
                        setRenameText(currentNode.name);
                        setRenaming(true);
                      }}
                    >
                      Rename
                    </button>
                    {currentNode.id !== tree.rootId && (
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => setConfirmDeleteId(currentNode.id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              )}

              {confirmDeleteId === currentNode.id && (
                <div
                  style={{
                    marginTop: 10,
                    padding: 10,
                    background: '#fef2f2',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 8
                  }}
                >
                  <span style={{ fontSize: '0.84rem', color: '#991b1b' }}>
                    Delete this node and all its sub-nodes?
                  </span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteNode(currentNode.id)}
                    >
                      Yes, Delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={() => setConfirmDeleteId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="stats-row">
                <span className="badge badge-target">
                  🎯 {doneTargetsCount}/{currentNode.targets.length} Targets
                </span>
                <span className="badge badge-idea">
                  💡 {currentNode.ideas.length} Ideas
                </span>
                <span className="badge badge-task">
                  ✅ {doneTasksCount}/{currentNode.tasks.length} Tasks
                </span>
                <span className="badge badge-node">
                  🌿 {currentNode.childrenIds.length} Sub-nodes
                </span>
              </div>
            </section>

            <div className="filter-bar">
              {[
                ['all', 'All'],
                ['targets', '🎯 Targets'],
                ['ideas', '💡 Ideas'],
                ['tasks', '✅ Tasks'],
                ['subnodes', '🌿 Sub-nodes']
              ].map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  className={`filter-tab ${tab === key ? 'active' : ''}`}
                  onClick={() => setTab(key)}
                >
                  {label}
                </button>
              ))}
            </div>

            {(tab === 'all' || tab === 'targets') && (
              <ItemSection
                title="Targets"
                icon="🎯"
                type="targets"
                items={currentNode.targets}
                placeholder="Add a target or goal..."
                btnClass="btn-target"
                checkable
                targetStyle
                onAdd={handleAddItem}
                onToggle={handleToggleItem}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
              />
            )}

            {(tab === 'all' || tab === 'ideas') && (
              <ItemSection
                title="Ideas"
                icon="💡"
                type="ideas"
                items={currentNode.ideas}
                placeholder="Capture a thought or idea..."
                btnClass="btn-idea"
                onAdd={handleAddItem}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
              />
            )}

            {(tab === 'all' || tab === 'tasks') && (
              <ItemSection
                title="Tasks"
                icon="✅"
                type="tasks"
                items={currentNode.tasks}
                placeholder="Add an actionable task..."
                btnClass="btn-task"
                checkable
                onAdd={handleAddItem}
                onToggle={handleToggleItem}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
              />
            )}

            {(tab === 'all' || tab === 'subnodes') && (
              <section className="card">
                <div className="section-head">
                  <h3 className="section-title">
                    <span>🌿</span>
                    <span>Sub-nodes</span>
                    <span className="node-sub">
                      ({currentNode.childrenIds.length})
                    </span>
                  </h3>
                </div>

                <form className="add-form" onSubmit={handleAddSubNode}>
                  <input
                    className="input"
                    value={subNodeDraft}
                    onChange={(e) => setSubNodeDraft(e.target.value)}
                    placeholder="Name a new sub-node..."
                  />
                  <button type="submit" className="btn btn-node">
                    + Add Node
                  </button>
                </form>

                {currentNode.childrenIds.length === 0 ? (
                  <p className="empty-note">
                    No sub-nodes yet. Add one to branch your tree!
                  </p>
                ) : (
                  <div className="subnode-grid">
                    {currentNode.childrenIds.map((childId) => {
                      const child = tree.nodes[childId];
                      if (!child) return null;
                      return (
                        <div
                          key={child.id}
                          className="subnode-card"
                          onClick={() => navigateTo(child.id)}
                        >
                          <div className="subnode-top">
                            <span className="subnode-name">{child.name}</span>
                            <span style={{ color: '#0284c7', fontWeight: 700 }}>
                              Open →
                            </span>
                          </div>
                          <div className="stats-row" style={{ marginTop: 0 }}>
                            <span className="badge badge-target">
                              🎯 {child.targets.length}
                            </span>
                            <span className="badge badge-idea">
                              💡 {child.ideas.length}
                            </span>
                            <span className="badge badge-task">
                              ✅ {child.tasks.length}
                            </span>
                            <span className="badge badge-node">
                              🌿 {child.childrenIds.length}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            )}
          </>
        )}
      </main>

      {backupOpen && (
        <div className="modal-backdrop" onClick={() => setBackupOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="section-head">
              <h3 className="section-title">Device Data & Backup</h3>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setBackupOpen(false)}
              >
                Close
              </button>
            </div>
            <p className="empty-note">
              Your tree is saved automatically on your device in IndexedDB. Use
              export/import to back up or transfer your tree.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleExportDownload}
              >
                Download JSON
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={handleCopyJson}
              >
                Copy JSON
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={handleResetTree}
              >
                Reset All
              </button>
            </div>

            <textarea
              className="textarea"
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Paste exported JSON here to restore..."
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
                gap: 8
              }}
            >
              <span style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>
                {backupMsg}
              </span>
              <button
                type="button"
                className="btn btn-task btn-sm"
                onClick={handleImportJson}
              >
                Restore JSON
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
