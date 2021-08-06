import VueRouter from "vue-router";
import DefaultPage from "@/pages/landing/default/DefaultPage.vue";

import LoginPage from "@/pages/landing/login/LoginPage.vue";
import RegistrationPage from "@/pages/landing/registration/RegistrationPage.vue";
import LandingPage from "@/pages/landing/LandingPage.vue";

import ChattyPage from "@/pages/chatty/ChattyPage.vue";
import ChattyOverviewPage from "@/pages/chatty/overview/ChattyOverviewPage.vue";

import ChatbotPage from "@/pages/chatty/chatbot/ChatbotPage.vue";

import ClassifiersPage from "@/pages/chatty/classifiers/ClassifiersPage.vue";
import ClassifiersOverview from "@/pages/chatty/classifiers/overview/ClassifiersOverview.vue";
import ClassifiersCreate from "@/pages/chatty/classifiers/create/ClassifiersCreate.vue";
import ClassifiersDetails from "@/pages/chatty/classifiers/details/ClassifiersDetails.vue";
import ClassifiersDetailsInformation from "@/pages/chatty/classifiers/details/information/ClassifiersDetailsInformation.vue";
import ClassifiersDetailsTraining from "@/pages/chatty/classifiers/details/training/ClassifiersDetailsTraining.vue";
import ClassifiersDetailsUpload from "@/pages/chatty/classifiers/details/upload/ClassifiersDetailsUpload.vue";
import ClassifiersDetailsIntents from "@/pages/chatty/classifiers/details/intents/ClassifiersDetailsIntents.vue";
import ClassifiersDetailsLabelData from "@/pages/chatty/classifiers/details/label_data/ClassifiersDetailsLabelData.vue";

import AnswerSelectionPage from "@/pages/chatty/answer_selection/AnswerSelectionPage.vue";
import AnswerSelectionOverview from "@/pages/chatty/answer_selection/overview/AnswerSelectionOverview.vue";
import AnswerSelectionCreate from "@/pages/chatty/answer_selection/create/AnswerSelectionCreate.vue";
import AnswerSelectionDetails from "@/pages/chatty/answer_selection/details/AnswerSelectionDetails.vue";
import AnswerSelectionDetailsInformation from "@/pages/chatty/answer_selection/details/information/AnswerSelectionDetailsInformation.vue";
import AnswerSelectionDetailsTraining from "@/pages/chatty/answer_selection/details/training/AnswerSelectionDetailsTraining.vue";
import AnswerSelectionDetailsUpload from "@/pages/chatty/answer_selection/details/upload/AnswerSelectionDetailsUpload.vue";

import DstPage from "@/pages/chatty/dialogue_state_tracking/DstPage.vue";
import DstUpload from "@/pages/chatty/dialogue_state_tracking/upload/DstUpload.vue";
import DstDetails from "@/pages/chatty/dialogue_state_tracking/details/DstDetails.vue";
import DstOverview from "@/pages/chatty/dialogue_state_tracking/overview/DstOverview.vue";

import Seq2SeqPage from "@/pages/chatty/seq2seq/Seq2SeqPage.vue";
import Seq2SeqOverview from "@/pages/chatty/seq2seq/overview/Seq2SeqOverview.vue";
import Seq2SeqDetails from "@/pages/chatty/seq2seq/details/Seq2SeqDetails.vue";
import Seq2SeqTraining from "@/pages/chatty/seq2seq/details/training/Seq2SeqTraining.vue";
import Seq2SeqTesting from "@/pages/chatty/seq2seq/details/testing/Seq2SeqTesting.vue";
import Seq2SeqUpload from "@/pages/chatty/seq2seq/upload/Seq2SeqUpload.vue";

import ChattyDialogWoz from "@/pages/chatty_dialog_woz/ChattyDialogWoz.vue";
import AddUserResponse from "@/pages/chatty_dialog_woz/AddUserResponse.vue";
import AddSystemResponse from "@/pages/chatty_dialog_woz/AddSystemResponse.vue";

import Vue from "vue";

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: LandingPage,
      children: [
        { path: "", component: DefaultPage },
        {
          path: "login",
          component: LoginPage,
        },
        {
          path: "register",
          component: RegistrationPage,
        },
        {
          path: "chatty",
          meta: { requiresAuth: true },
          component: ChattyPage,
          children: [
            { path: "chatbot", component: ChatbotPage, name: "ChatbotPage" },

            {
              path: "",
              component: ChattyOverviewPage,
            },
            {
              path: "classifiers",
              component: ClassifiersPage,
              children: [
                {
                  path: "",
                  component: ClassifiersOverview,
                  name: "ClassifiersOverview",
                },
                {
                  path: "create",
                  component: ClassifiersCreate,
                  name: "ClassifiersCreate",
                },
                {
                  path: "details/:classifierName",
                  component: ClassifiersDetails,
                  children: [
                    {
                      path: "",
                      component: ClassifiersDetailsInformation,
                      name: "ClassifiersDetailsInformation",
                    },
                    {
                      path: "training",
                      component: ClassifiersDetailsTraining,
                      name: "ClassifiersDetailsTraining",
                    },
                    {
                      path: "upload",
                      component: ClassifiersDetailsUpload,
                      name: "ClassifiersDetailsUpload",
                    },
                    {
                      path: "intents",
                      component: ClassifiersDetailsIntents,
                      name: "ClassifiersDetailsIntents",
                    },
                    {
                      path: "label_data",
                      component: ClassifiersDetailsLabelData,
                      name: "ClassifiersDetailsLabelData",
                    },
                  ],
                },
              ],
            },
            {
              path: "answer_selection",
              component: AnswerSelectionPage,
              children: [
                {
                  path: "",
                  component: AnswerSelectionOverview,
                  name: "AnswerSelectionOverview",
                },
                {
                  path: "create",
                  component: AnswerSelectionCreate,
                  name: "AnswerSelectionCreate",
                },
                {
                  path: "details/:answerSelectionName",
                  component: AnswerSelectionDetails,
                  children: [
                    {
                      path: "",
                      component: AnswerSelectionDetailsInformation,
                      name: "AnswerSelectionDetailsInformation",
                    },
                    {
                      path: "training",
                      component: AnswerSelectionDetailsTraining,
                      name: "AnswerSelectionDetailsTraining",
                    },
                    {
                      path: "upload",
                      component: AnswerSelectionDetailsUpload,
                      name: "AnswerSelectionDetailsUpload",
                    },
                  ],
                },
              ],
            },
            {
              path: "dialogue_state_tracking",
              component: DstPage,
              children: [
                {
                  path: "",
                  component: DstOverview,
                  name: "DstOverview",
                },
                {
                  path: "upload",
                  component: DstUpload,
                  name: "DstUpload",
                },
                {
                  path: ":dstId",
                  name: "DstDetails",
                  component: DstDetails,
                  props: true,
                },
              ],
            },
            {
              path: "seq2seq",
              component: Seq2SeqPage,
              children: [
                {
                  component: Seq2SeqOverview,
                  name: "Seq2SeqOverview",
                  path: "",
                  children: [],
                },
                {
                  component: Seq2SeqDetails,
                  name: "Seq2SeqDetails",
                  path: ":seq2SeqId",
                  props: true,
                  children: [
                    {
                      component: Seq2SeqTraining,
                      path: "training",
                      name: "Seq2SeqTraining",
                    },
                    {
                      component: Seq2SeqTesting,
                      path: "testing",
                      name: "Seq2SeqTesting",
                    },
                  ],
                },
                {
                  path: "upload",
                  component: Seq2SeqUpload,
                  name: "Seq2SeqUpload",
                },
              ],
            },
            {
              path: "dialog_woz",
              component: ChattyDialogWoz,
              children: [
                {
                  path: "user",
                  component: AddUserResponse,
                },
                {
                  path: "system",
                  component: AddSystemResponse,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem("access_token")) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    // if the route does not require authentication but there exists a session in the local
    // storage then go to dashboard
    if (localStorage.getItem("access_token")) {
      next({ path: "/chatty" });
    } else {
      next();
    }
  }
});
export { router };
