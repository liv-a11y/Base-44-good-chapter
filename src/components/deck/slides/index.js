import { Cover, History, Problem } from "@/components/deck/slides/OpeningSlides";
import { Mechanic, WhatWeHeard, WhyItWorks } from "@/components/deck/slides/EvidenceSlides";
import {
  Chapters,
  Competition,
  GuestEmail,
  Product,
} from "@/components/deck/slides/ProductSlides";
import { Distribution, Market, Math, Realtors } from "@/components/deck/slides/MarketSlides";
import {
  Ask,
  BusinessModel,
  MarginLadder,
  UseOfFunds,
} from "@/components/deck/slides/MoneySlides";

export const slides = [
  { id: "cover", name: "Cover", component: Cover },
  { id: "history", name: "Where the registry started", component: History },
  { id: "problem", name: "The problem", component: Problem },
  { id: "why", name: "Why it works", component: WhyItWorks },
  { id: "heard", name: "What we heard", component: WhatWeHeard },
  { id: "mechanic", name: "The mechanic", component: Mechanic },
  { id: "email", name: "What her people receive", component: GuestEmail },
  { id: "product", name: "The product", component: Product },
  { id: "chapters", name: "Occasions", component: Chapters },
  { id: "competition", name: "Competition", component: Competition },
  { id: "market", name: "Serviceable market", component: Market },
  { id: "math", name: "The math", component: Math },
  { id: "distribution", name: "How it reaches people", component: Distribution },
  { id: "realtors", name: "Why realtors say yes", component: Realtors },
  { id: "model", name: "Business model", component: BusinessModel },
  { id: "margin", name: "Margin ladder", component: MarginLadder },
  { id: "ask", name: "The ask", component: Ask },
  { id: "funds", name: "Use of funds", component: UseOfFunds },
];