import styled from 'styled-components';
import {Menu} from "../Menu/Menu";
import {DocsContent} from "../DocsContent/DocsContent";

const StyledPage = styled.div`
  font-family: 'Inter', sans-serif;
  height: 100%;
  max-height: 100%;
  flex-direction: row;
  display: flex;
  font-size: 14px;
  color: #878f99;

  .menu-container-wrapper {
    overflow-y: auto;
    height: 100%;
    flex: 0 0 340px;
  }

  .content {
    overflow: auto;
    max-height: 100%;
      }
`;

export function DocsContainer(props: any) {

    return (
        <StyledPage>
            <div className="menu-container-wrapper">
                <Menu api={props.api} />
            </div>
            <div className="flex-fill content">
                <DocsContent api={props.api} />
            </div>
        </StyledPage>
    );
}