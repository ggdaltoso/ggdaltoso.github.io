import { useStaticQuery, graphql } from 'gatsby';
import { parse, isValid } from 'date-fns';

// Expects filename format: YYYY-MM-DD[-description].ext
const parseDateFromName = (name) => {
  const match = name.match(/^(\d{4}-\d{2}-\d{2})/);
  if (!match) return null;
  const date = parse(match[1], 'yyyy-MM-dd', new Date());
  return isValid(date) ? date : null;
};

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

  const stories = data.allFile.nodes.map(({ publicURL, name }) => ({
    url: publicURL,
    date: parseDateFromName(name),
    duration: 5000,
  }));

  return { stories, hasStories: stories.length > 0 };
};

export default useStories;
