"use client";
import TrieVisualizer, { TrieNode } from "@/components/treeVisualizer";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("");

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<TrieNode | null>(null);

  const insertTrie = async () => {
    try {
      setLoading(true);
      await fetch("http://localhost:3001/api/trie/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ term: value }),
      });
    } catch (e) {
      console.log("error", e);
    } finally {
      setLoading(false);
      setValue("");
    }
  };

  const getTrie = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3001/api/trie/toJSON");
      const data = await res.json();
      setData(data);
    } catch (e) {
      console.log("error", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
    <div className="flex justify-between">
      <input
        type="text"
        placeholder="insert a word"
        value={value}
        className="border-gray-300 border rounded-md p-2"
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="flex gap-2">
        <button onClick={() => insertTrie()} disabled={loading} className="bg-[#4f46e5] p-1 rounded-md">
          Insert in Trie DB
        </button>
        <button
          onClick={() => getTrie()}
          disabled={loading}
          className="bg-[#4f46e5] p-1 rounded-md"
        >
          Generate Trie
        </button>
      </div>
      </div>
        {data && <TrieVisualizer data={data} />}
    </div>
  );
}
