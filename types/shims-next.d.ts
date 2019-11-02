import { Store } from "redux";
import { CommonState } from "../redux/reducer";
import { NextPageContext, NextContext } from "next";
import {AppProps } from "next/app";
import { DefaultQuery } from "next/router";

declare module "next" {
    interface NextContext extends NextPageContext {
        store: Store<CommonState>
    }
}
declare module "next/app" {
    interface AppProps extends NextPageContext {
        store: Store<CommonState>
    }
}