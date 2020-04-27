import { ChartId, initialId } from './chart.model';
import { SELECT_ID } from './chart.action';
import { ChartAction } from './action.interface';

export function getChartId(state: ChartId = initialId, action: ChartAction) {
    switch (action.type) {
        case SELECT_ID:
            return Object.assign({}, state, {
                id: action.payload
            });

        default:
            return state;
    }
}
