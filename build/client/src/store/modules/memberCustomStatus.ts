import {
  Module,
  VuexModule,
  Action,
  Mutation,
  getModule
} from "vuex-module-decorators";
import store from "..";
import Vue from "vue";

// customStatus[user_id]: status;
interface CustomStatus {
  [key: string]: string;
}

@Module({ dynamic: true, store, namespaced: true, name: "customStatuses" })
class CustomStatuses extends VuexModule {
  customStatus: CustomStatus = {};

  @Mutation
  private INIT_CUSTOM_STATUS(payload: CustomStatus) {
    this.customStatus = payload;
  }

  @Action
  public InitCustomStatus(payload: CustomStatus) {
    this.INIT_CUSTOM_STATUS(payload);
  }
  @Mutation
  private SET_CUSTOM_STATUS(payload: { id: string; custom_status: string }) {
    Vue.set(this.customStatus, payload.id, payload.custom_status);
  }

  @Action
  public SetCustomStatus(payload: { id: string; custom_status: string }) {
    this.SET_CUSTOM_STATUS(payload);
  }
  @Mutation
  private REMOVE_CUSTOM_STATUS(payload: { id: string }) {
    Vue.delete(this.customStatus, payload.id);
  }

  @Action
  public RemoveCustomStatus(payload: { id: string }) {
    this.REMOVE_CUSTOM_STATUS(payload);
  }

  @Mutation
  private ADD_CUSTOM_STATUSES(payload: CustomStatus | any) {
    Vue.set(this, "customStatus", { ...this.customStatus, ...payload });
  }

  @Action
  public AddCustomStatuses(payload: CustomStatus | any) {
    this.ADD_CUSTOM_STATUSES(payload);
  }
}
export const CustomStatusesModule = getModule(CustomStatuses);
