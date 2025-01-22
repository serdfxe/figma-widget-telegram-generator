const { useSyncedState } = figma.widget

/** Dynamic Object of unknown values */
export type DynamicState = { [key: string]: unknown }
/** setState Callback (Only valid keys with matching values for initialState)
 * @param propKey - Accepts keys from `initialState`
 * @param propValue - Values of matching type for `initialState[propKey]`
 */
export type DynamicSetSTate<S> = <K extends keyof S>(propKey: K, propValue: S[K]) => void

/** Centralized safely typed synced state object manager (example: hold multiple input values)
 * @param initialState - `useSyncedState` default Value
 * @returns [state, setSafeState]
 *
 * @example
 * const [inputs, setInputs] = useDynamicState({
 *    messageText: "",
 *    buttons: [
 *       { id: 1, text: "Button 1" },
 *       { id: 2, text: "Button 2" },
 *    ],
 * })
 *
 * // Update state for specific state property
 * setInputs("buttons", [{ id: 1, text: "Updated Button 1" }, { id: 2, text: "Updated Button 2" }])
 * console.log(inputs.buttons[0].text) // Output: "Updated Button 1"
 */
export default function useDynamicState<S extends DynamicState>({ ...initialState }: S): [S, DynamicSetSTate<S>] {
   const [state, setState] = useSyncedState<S>("state", initialState)

   /** Update state for specific state property */
   const setSafeState: DynamicSetSTate<S> = (propKey, propValue) => {
      setState((prevState) => ({
         ...prevState,
         [propKey]: propValue,
      }))
   }

   return [state, setSafeState] // Alternative: declare return as const
}
