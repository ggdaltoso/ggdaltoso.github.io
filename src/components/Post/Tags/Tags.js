// @flow
import React from "react";
import { Button } from "@react95/core";
import { Link } from "gatsby";

import styles from "./Tags.module.scss";

type Props = {
  tags: string[],
  tagSlugs: string[],
};

const Tags = ({ tags, tagSlugs }: Props) => (
  <div className={styles["tags"]}>
    <ul className={styles["tags__list"]}>
      {tagSlugs &&
        tagSlugs.map((slug, i) => (
          <li className={styles["tags__list-item"]} key={tags[i]}>
            <Button>
              <Link to={slug}>{tags[i]}</Link>
            </Button>
          </li>
        ))}
    </ul>
  </div>
);

export default Tags;
