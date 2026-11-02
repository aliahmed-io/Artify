import React from 'react';
export default function Header({title,subtitle}:{title:string;subtitle?:string}){return <header className="tool-page-intro"><h1>{title}</h1>{subtitle&&<p>{subtitle}</p>}</header>}
