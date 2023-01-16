import styled from 'styled-components';
import {API} from "../../service/swagger/swagger.interface";
import { StickyContainer, Sticky } from 'react-sticky';
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Link from "next/link";
import classNames from "classnames";
import {Paths} from "../Paths/Paths";
import {BodyViewer} from "../BodyViewer/BodyViewer";
import Accordion from 'react-bootstrap/Accordion';

const StyledContainer = styled.div`
  .path-title {
    padding: 10px;
    color: #000;
    font-size: 14px;
  }
  
  .fixed-path {
    font-size: 14px;
    position: sticky;
    top: 0px;
    z-index: 10;
  }

  .name {
    font-size: 12px;
    opacity: 0.5;
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
    padding: 5px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 20px;
    width: 80px;
    text-align: center;

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
            <div className="pb-0 pt-3" id={props.route.path}>

            <Accordion defaultActiveKey={'0'}>

                <Accordion.Item eventKey="0">

                    <Accordion.Header className={'fixed-path'}>
                        <h5 className={"path-title d-flex w-100 align-items-center"}>
                            <div className={'flex-fill'}>
                            <div className={classNames("method", props.route.method.toLowerCase())}>
                                {props.route.method}
                            </div>
                            {props.route.path}
                            </div>
                            <div className="name pe-2">
                                {props.route.name}
                            </div>
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


                        {props.route.responses && props.route.responses.length > 0 && (
                            <div>
                                <div className="route-sub-title">
                                    Responses
                                </div>
                                {/*<BodyViewer body={props.route.requestBody} />*/}
                            </div>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            </div>
        </StyledContainer>
    );
}