"use client";

import { Grid } from "@/components/ui-kit";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Post from '../Post';
import SectionHeading from '../../Heading';



const RelatedBlogs = ({blogID}) => {
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${blogID}/related_blog`)
    .then(({data}) => {
      if(data?.status){
        setRelatedBlogs(data?.related_blogs);
        setLoading(false);
      }
    })
  }, [blogID]);

  return (
    <div>
      {isLoading}
      <Grid container spacing={2} className="mb-[2rem] flex justify-start flex-wrap [@media(max-width:768)]:justify-start">
        {relatedBlogs?.length > 0 &&
          relatedBlogs?.map((post) => (
            <>
              <SectionHeading title="Related Blog" large></SectionHeading>
              <Post key={post?.id} post={post}/>
            </>
          ))}
      </Grid>
    </div>
  );
};

export default RelatedBlogs;