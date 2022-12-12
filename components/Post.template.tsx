import React from "react";

interface PostProps {
  children: React.ReactNode;
}
const Post = ({ children }: any) => {
  let subComponentList = Object.keys(Post);

  let subComponents = subComponentList.map((key) => {
    return React.Children.map(children, (child) =>
      child.type.name === key ? child : null
    );
  });

  return (
    <main className="flex flex-col flex-w items-center select-none">
      <div>{subComponents.map((component) => component)}</div>
    </main>
  );
};

const Header = (props: { children: React.ReactNode }) => (
  <div className="mt-5 text-5xl text-center md:text-left">
    {props.children?.toString().toUpperCase()}
  </div>
);
Post.Header = Header;

const Quote = (props: { text: string; author: string }) => (
  <div className="m-5 text-center md:text-left">
    <span className="italic">{`"${props.text}"`}</span>
    {" - "}
    {props.author}
  </div>
);
Post.Quote = Quote;

const Summary = (props: { children: React.ReactNode }) => (
  <div className="border-l-4 pl-4">{props.children}</div>
);
Post.Summary = Summary;

const Body = (props: { children: React.ReactNode }) => (
  <div className="flex flex-col items-center mt-10 w-11/12 p-10 pt-5 border rounded-md shadow-md">
    {props.children}
  </div>
);
Post.Body = Body;

const Footer = (props: { children: React.ReactNode }) => (
  <div className="card-footer">{props.children}</div>
);
Post.Footer = Footer;

export default Post;
