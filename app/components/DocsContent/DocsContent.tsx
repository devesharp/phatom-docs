import styled from 'styled-components';
import {API} from "../../service/swagger/swagger.interface";
import { StickyContainer, Sticky } from 'react-sticky';
import {GroupSection} from "../GroupSection/GroupSection";

const StyledContainer = styled.div`
  max-width: 940px;
  background: white;
  padding: 40px;

  .title-group {
    padding-bottom: 10px;
    color: #f4f6fa;
    font-weight: 600;
  }

  h2 {
    color: #2a2f36;
    padding-bottom: 24px;
    padding-top: 34px;
  }

  .page-section {
    padding-bottom: 50px;
  }
`;

interface IProps {
    api: API
}
export function DocsContent(props: IProps) {

    return (
        <StyledContainer>
            <div className="page-section">
                <div className="title-group">Bem vindo</div>

                <h2>Introdução</h2>

                <p className="description">
                    The 1inch API v4, Pathfinder, is a cutting-edge discovery and routing
                    algorithm, which offers asset exchanges at the best rates on the
                    market. Pathfinder finds the most efficient paths for a token swap,
                    able to split between different protocols and even different market
                    depths in within one protocol in the shortest possible time.
                    <br />
                    <br />
                    This API documentation is intended for public use. If you are an
                    enterprise with significant trading volumes please fill in the form so
                    we can assign you a custom API endpoint. The enterprise endpoint will
                    offer significantly better performance across market rates and
                    response times.
                </p>
            </div>


                <StickyContainer className="page-section">
                <div className="title-group">Rotas</div>

                {props.api.sections.map((value) => <GroupSection key={value.group} api={props.api} section={value} />)}
                </StickyContainer>

        </StyledContainer>
    );
}