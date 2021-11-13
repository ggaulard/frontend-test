# Frontend Aircall Test

## Usage

[Detailed commands available](docs/CONTRIBUTING.md)

> TLDR 💤  
> **yarn start** (after yarn install of course 😎)

---

## Architecture

## - components

Visual components

_no business logic, no api call, no context_

## - context

Stores for variables, and their lifecycle management that can be access anywhere

_no direct api call_

## - data

Api calls, using [swr](https://swr.vercel.app/) and [fetch](https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch)  
Results need their own [DTOs(Data Transfer Object)](https://wikipedia.org/wiki/Data_transfer_object) and **calls only returns domain objects** (see domain section)

_no business logic_

## - domain

Objects with business constrains and evolved data types

## - pages

Pages and their internal components that orchestrate business logic between visual components, context, data
