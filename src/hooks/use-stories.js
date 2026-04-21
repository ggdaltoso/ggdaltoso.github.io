import { useStaticQuery, graphql } from 'gatsby';

const useStories = () => {
  const data = useStaticQuery(graphql`
    query StoriesQuery {
      allFile(
        filter: {
          sourceInstanceName: { eq: "assets" }
          relativeDirectory: { eq: "stories" }
          extension: { regex: "/(jpg|jpeg|png|gif|webp)/" }
        }
        sort: { name: ASC }
      ) {
        nodes {
          publicURL
          name
        }
      }
    }
  `);

  const stories = data.allFile.nodes.map(({ publicURL }) => ({
    url: publicURL,
    duration: 5000,
  }));

  return { stories, hasStories: stories.length > 0 };
};

export default useStories;
