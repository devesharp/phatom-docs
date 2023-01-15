import styled from 'styled-components';
import {API} from "../../service/swagger/swagger.interface";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Link from "next/link";
import classNames from "classnames";
import {RouteSection} from "../RouteSection/RouteSection";

const StyledContainer = styled.div`
  h2 {
    
  }
`;

interface IProps {
    api: API,
    section: API['sections'][0];
}
export function GroupSection(props: IProps) {

    return (
        <StyledContainer>
            <div>
                <h2>{props.section.group}</h2>

                {!!props.section.description && (
                    <p className="description">{props.section.description}</p>
                )}

                {props.section.routes.map((route) => <RouteSection api={props.api} route={route} />)}
            </div>
        </StyledContainer>
    );
}