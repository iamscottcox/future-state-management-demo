import { useState } from 'react';
import { useQuery } from 'react-query';

import { Article, fetchArticles } from 'src/api/articles';
import ArticleFilters from 'src/components/Articles/Filters';
import styled from 'styled-components';

const StyledArticle = styled.article`
    display: grid;
    align-items: center;
    grid-template: 
        [row1-start] "name name icons" 1fr [row1-end]
        [row2-start] "strapline strapline icons" 1fr [row2-end]
        / 1fr 25px;
    margin-bottom: 1rem;

    h3 {
        grid-area: name;
    }

    p {
        grid-area: strapline
    }

    h3, p {
        margin: 0;
    }

    .edit-icon {
        opacity: 0;
        transition: all ease-in-out 0.2s;
        grid-area: icons;
    }

    &:hover {
        .edit-icon {
            opacity: 1;
        }
    }
`

const EditButton = ({ onClick }) => {
    return (
        <span className="edit-icon"><button type="button" onClick={onClick}>✏️</button></span>
    )
}

const EditableString = ({ value: initialValue, className = '' }) => {
    const [value, setValue] = useState(initialValue);
    const [editing, setEditing] = useState(false)
    const [valueBeforeEdits, setValueBeforeEdits] = useState(initialValue);
    
    if (editing === true) {
        return (
            <div className="editing">
                <input value={value} onChange={(e) => { setValue(e.target.value) }}/>
                <button type="button" onClick={() => { setEditing(false) }}>✅</button>
                <button type="button" onClick={() => { 
                    setValue(valueBeforeEdits);
                    setEditing(false);
                }}>❌</button>
            </div>
        )
    } else {
        return  (
            <div className="article-value">
                <h3>{value}</h3> <EditButton onClick={() => { 
                    setEditing(true);
                    setValueBeforeEdits(value);
                }} />
            </div>
        )
    }
}

const ArticleName = ({ name: initialName = '' }) => {
    const [name, setName] = useState(initialName);
    const [editing, setEditing] = useState(false)
    const [nameBeforeEdits, setNameBeforeEdits] = useState(initialName);
    
    if (editing === true) {
        return (
            <div className="article-name editing">
                <input value={name} onChange={(e) => { setName(e.target.value) }}/>
                <button type="button" onClick={() => { setEditing(false) }}>✅</button>
                <button type="button" onClick={() => { 
                    setName(nameBeforeEdits);
                    setEditing(false);
                }}>❌</button>
            </div>
        )
    } else {
        return  (
            <div className="article-name">
                <h3>{name}</h3> <EditButton onClick={() => { 
                    setEditing(true);
                    setNameBeforeEdits(name);
                }} />
            </div>
        )
    }
}

export const Articles = () => {
    const { isLoading, isError, data, error } = useQuery<Article[], Error>('articles', fetchArticles);

    if (isLoading) return <p>Loading...</p>

    if (isError && error) return <p>Error: {error.message}</p>

    return (
        <div>
            <ArticleFilters isLoading={isLoading} />
            {data?.map(({ name, strapline, id }) => (
                <StyledArticle key={id}>
                    <ArticleName name={name} />
                    {strapline && <p>{strapline}</p>}
                </StyledArticle>
            ))}
        </div>
    )
}

export default Articles;