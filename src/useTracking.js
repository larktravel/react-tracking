import { useContext, useMemo } from 'react';
import { ReactTrackingContext } from './withTrackingComponentDecorator';

export default function useTracking() {
  const trackingContext = useContext(ReactTrackingContext);
  const errorText =
    'Attempting to call `useTracking` without a ReactTrackingContext present.' +
    'Did you forget to wrap the top of your component tree with `track`?';

  if (!(trackingContext && trackingContext.tracking)) {
    console.warn(errorText);
    return null;
    // throw new Error(errorText);
  }

  return useMemo(
    () => ({
      getTrackingData: trackingContext.tracking.getTrackingData,
      trackEvent: trackingContext.tracking.dispatch,
    }),
    [
      trackingContext.tracking.getTrackingData,
      trackingContext.tracking.dispatch,
    ]
  );
}
