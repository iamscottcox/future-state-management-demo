import Link from 'next/link';
import { FC } from 'react';
import { UseQueryResult } from 'react-query';
import styled from 'styled-components';

// const EditButton = ({ onClick }) => {
//     return (
//         <span className="edit-icon"><button type="button" onClick={onClick}>✏️</button></span>
//     )
// }

// const EditableString = ({ value: initialValue, className = '' }) => {
//     const [value, setValue] = useState(initialValue);
//     const [editing, setEditing] = useState(false)
//     const [valueBeforeEdits, setValueBeforeEdits] = useState(initialValue);

//     if (editing === true) {
//         return (
//             <div className="editing">
//                 <input value={value} onChange={(e) => { setValue(e.target.value) }}/>
//                 <button type="button" onClick={() => { setEditing(false) }}>✅</button>
//                 <button type="button" onClick={() => { 
//                     setValue(valueBeforeEdits);
//                     setEditing(false);
//                 }}>❌</button>
//             </div>
//         )
//     } else {
//         return  (
//             <div className="article-value">
//                 <h3>{value}</h3> <EditButton onClick={() => { 
//                     setEditing(true);
//                     setValueBeforeEdits(value);
//                 }} />
//             </div>
//         )
//     }
// }

interface OwnProps {
    isLoading?: UseQueryResult['isLoading'];
    error: Error | null;
    artists?: API.Artist[];
}

type Props = OwnProps;

const StyledArtists = styled.div`
    display: flex;
    flex-flow: column wrap;
`

const StyledArtist = styled.div`
    margin-bottom: 1rem;
    
    a {
        display: flex;
        align-items: center;

        img {
            width: 150px;
            margin-right: 1rem;
        }
    }
`

export const Artists: FC<Props> = ({ artists = [], isLoading = false, error }) => {
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>

    return (
        <StyledArtists>
            {artists && artists?.map(({ title, id, cover_image: coverImage }) => (
                <StyledArtist key={id}>
                    <Link href={`/artists/${id}`}>
                        <a>
                            <img
                                className="artists-list-item-image"
                                src={
                                    coverImage.includes("spacer.gif")
                                    ? "https://via.placeholder.com/150"
                                    : coverImage
                                }
                                alt={title}
                            />
                            <h3>{title}</h3>
                        </a>
                    </Link>
                </StyledArtist>
            ))}
        </StyledArtists>
    )
}

export default Artists;