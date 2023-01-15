import styled from 'styled-components';
import {API} from "../../service/swagger/swagger.interface";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Link from "next/link";
import classNames from "classnames";
import {Paths} from "../Paths/Paths";
import {BodyViewer} from "../BodyViewer/BodyViewer";
import Accordion from 'react-bootstrap/Accordion';

const StyledContainer = styled.div`
  .path-title {
    background: #eee;
    padding: 10px;
    color: #000;
    font-size: 16px;
  }

  h5 {
    padding: 0px !important;
    margin: 0px !important;
  }
  
  .accordion-header {
    padding: 10px;
    background: #eee;

    button {
      background: #eee;
    }
  }
  
  .accordion-button {
    padding: 0px;
    margin: 0px;
  }

  .method {
    font-size: 14px;
    text-transform: uppercase;
    color: white;
    font-weight: 600;
    padding: 5px 10px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 20px;

    &.get {
      background: #000;
      color: #29a9c0;
    }

    &.post {
      background: #000;
      color: #32ba0d;
    }

    &.put {
      background: #000;
      color: #f7b500;
    }

    &.delete {
      background: #000;
      color: #da001a;
    }

    &.patch {
      background: #000;
      color: #f7b500;
    }

    &.options {
      background: #000;
      color: #29a9c0;
    }

  }
  
  .route-sub-title {
    padding-top: 10px;
    padding-bottom: 5px;
    border-bottom: 1px solid #eee;
    text-transform: uppercase;
    font-weight: 600;
    color: #0d6efd;
    margin-top: 25px;
    margin-bottom: 10px;
  }
`;

interface IProps {
    api: API,
    route: API['sections'][0]['routes'][0];
}
export function RouteSection(props: IProps) {

    return (
        <StyledContainer>
            <div className="pb-3">
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
            <h5 id={props.route.path} className={"path-title"}>
                <div className={classNames("method", props.route.method.toLowerCase())}>
                    {props.route.method}
                </div>
                {props.route.path}
            </h5>
                    </Accordion.Header>
                    <Accordion.Body>
            <p>
                {props.route.description}
            </p>

            {props.route.pathParams && props.route.pathParams.length > 0 && (
                <div>
                <div className="route-sub-title">
                    Path Params
                </div>
                    <Paths params={props.route.pathParams} />
                </div>
            )}

            {props.route.headers && props.route.headers.length > 0 && (
                <div>
                    <div className="route-sub-title">
                        Headers Params
                    </div>
                    <Paths params={props.route.headers} />
                </div>
            )}

            {props.route.query && props.route.query.length > 0 && (
                <div>
                    <div className="route-sub-title">
                        Query Params
                    </div>
                    <Paths params={props.route.query} />
                </div>
            )}

            {props.route.requestBody && props.route.requestBody.length > 0 && (
                <div>
                    <div className="route-sub-title">
                        Body Request
                    </div>
                    <BodyViewer body={props.route.requestBody} />
                </div>
            )}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            </div>
        </StyledContainer>
    );
}