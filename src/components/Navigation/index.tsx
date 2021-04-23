import Link from 'next/link';
import styled from 'styled-components';

const StyledNav = styled.nav`
    display: flex;
    justify-content: center;
    background: blue;

    a {
        padding: 0.5rem;
        color: white;
    }
`

export const Navigation = () => (
    <StyledNav>
        <Link href="/artists">
            <a>Artists</a>
        </Link>
        {/* <button type="button" onClick={() => { console.log('state', store.getState()) }}>State</button> */}
    </StyledNav>
)

export default Navigation;