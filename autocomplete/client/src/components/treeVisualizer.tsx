// components/TrieVisualizer.tsx
import React from 'react';

export type TrieNode = {
  id:number,
  value: string;
  children: TrieNode[];
};

interface Props {
  data: TrieNode;
}

type TreeNode =  {
  x: number;
  y: number;
  id:number,
  value: string;
  children: TreeNode[];
  
}

 const NODE_GAP_X = 80;
const NODE_GAP_Y = 100;


const computeLayout = (
  node: TrieNode,
  depth = 0,
  xOffset = { value: 0 }
): TreeNode => {

  if (!node.children || node.children.length === 0) {

    const newNode : TreeNode = {...node, x:0, y:0, children:[] };
    newNode.x = xOffset.value;
    newNode.y = depth;
    xOffset.value += 1;
    return newNode;
  }

  const newNode : TreeNode = {...node, x:0, y:0, children:[]}

  const children = node.children.map((child: TrieNode) => computeLayout(child, depth + 1, xOffset));
  const first = children[0];
  const last = children[node.children.length - 1];
  newNode.x = (first.x + last.x) / 2;
  newNode.y = depth;
  newNode.children = children

  return newNode;
};


const renderNode = (node: TreeNode) => {

  console.log("inside here", node);
  const x = node.x * NODE_GAP_X + 50;
  const y = node.y * NODE_GAP_Y + 50;
  const elements = [];

  elements.push(
    <circle key={`circle-${node.id}`} cx={x} cy={y} r={20} fill="#4f46e5" />,
    <text key={`text-${node.id}`} x={x} y={y + 5} fill="white" textAnchor="middle">
      {node.value || '*'}
    </text>
  );

  node.children?.forEach(child => {
    const childX = child.x * NODE_GAP_X + 50;
    const childY = child.y * NODE_GAP_Y + 50;

    elements.push(
      <line
        key={`line-${node.id}-${child.id}`}
        x1={x}
        y1={y + 20}
        x2={childX}
        y2={childY - 20}
        stroke="white"
      />
    );

    elements.push(...renderNode(child));
  });

  return elements;

  
};




const TrieVisualizer: React.FC<Props> = ({ data }) => {


  const computedData =  computeLayout(data)
  console.log("data", data, computedData);

  return (
    <svg width="100%" height="100vh">
      {renderNode(computedData)}
    </svg>
  );
};

export default TrieVisualizer;
