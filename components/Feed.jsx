'use client'

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchedPosts, setsearchedPosts] = useState([]);
  const [clickedTag, setClickedTag] = useState('');

  const handleSearchChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const handleTagClick = (tag) => {
    setSearchText(tag.toLowerCase());
    setClickedTag(tag);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const searched = posts.filter((post) => {
      const promptMatch = post.prompt.toLowerCase().includes(searchText);
      const tagMatch = post.tag.toLowerCase().includes(searchText);
      const usernameMatch = post.creator.username
        .toLowerCase()
        .includes(searchText);

      return promptMatch || tagMatch || usernameMatch;
    });

    setsearchedPosts(searched);
  }, [searchText, posts]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder={`Search for a prompt, tag, or a username (${clickedTag})`}
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={searchedPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
