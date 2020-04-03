## Comments

### Long story short
1. Init formik (initial values, what to do on submit)
2. Give to context
3. At field get formik from context. Call formik.setFieldValue(pathToField, fieldValue) 

### Top to Bottom

All the process starts from `index.html` file:  
https://github.com/megarocks/formio-for-iot/blob/master/frontend/public/index.html#L22  
Builtin `webpack` bundler uses `index.html` to inject JS bundle

JS bundle root is `index.js` file:
https://github.com/megarocks/formio-for-iot/blob/master/frontend/src/index.js

There is import of root application component: `App` https://github.com/megarocks/formio-for-iot/blob/master/frontend/src/index.js#L10  
and rendering it and it's components tree to div with id=root from html file: https://github.com/megarocks/formio-for-iot/blob/master/frontend/src/index.js#L19

At the App there is creating of Context: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/App.js#L12
In terms where react component is a function - context is a named scope.  
App will import and render Capabilities screen: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/App.js#L67

At the capabilities screen component we're fist defining component specific hooks:  
1. built-in `useState` hook: it gives tuple with state values and function to set new state: `[initialValues, setInitialValues]`
2. `useApiResource` custom hook for `capabilities` resource. It abstracts api interaction (http calls) and provides object 
with functions and fields to interact with backend https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/useApiResource.js#L65
3. useEffect one time running built-in hook: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CapabilityScreen.js#L16
you can know that it will be executed once (on component mount by empty array of dependencies). So particularry here when
component will be mounted there will be effect which will call `fetch` function (given by useApiResource hook) which will
perform GET http call to api endpoint https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/useApiResource.js#L20
and after it will set response data to https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/useApiResource.js#L21
data state. And as data state has been updated and it was used at Capabilities screen it will cause this component to re-render (with data filled from response)
4. we use `useFormik` hook from formik library to create instance of formik state management object: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CapabilityScreen.js#L21
As input we provide:
   - initialValues,
   - stating to re-initialize form in case if initialValues changed (for example when `setInitialValues` called, in this case it will be called inside `onChangeCapabilityTemplate` https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CapabilityScreen.js#L45 which will be called
by `CreatableSelect` https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CapabilityScreen.js#L70 as it `onChange` handler: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CapabilityScreen.js#L74)
   - providing `onSubmit` function as callback. There we differ to create or to update data: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CapabilityScreen.js#L74
     and also, after operation re-fetching data: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CapabilityScreen.js#L36
     and displaying feedback to user: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CapabilityScreen.js#L37
5. we're also defined what to do when new item at dropdown is created: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CapabilityScreen.js#L51. As we know
only one string about this item at the moment, we're using it as id: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CapabilityScreen.js#L53
and calling `create` function of resource hook: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CapabilityScreen.js#L54, then re-fetching
data back: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CapabilityScreen.js#L55

6. Rendering of Capabilities screen: we wrapping all screen into context provider (so all child components will be able to get data from this context)
and defining actual context data: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CapabilityScreen.js#L64
there is whole `formik` state management object and helper flag: `showTagsInputs: true`. So child component will be able to know:
**do we want to show tags inputs at this context?**: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CapabilitySubForm.js#L16 and https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CapabilitySubForm.js#L49 (variable destructuring and conditional rendering approaches are used here)
Back to Capabilities screen: when we have initialValues: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CapabilityScreen.js#L80
we render: form https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CapabilityScreen.js#L83 and providing
method to call when submitting (it is our callback but wrapped with some formik additional logic (validation, fields state tracking: touched
untouched...)). Form consists from: form fields: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CapabilityScreen.js#L84 and submit button: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CapabilityScreen.js#L86  
when no initial values: rendering alert component: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CapabilityScreen.js#L92

### At Capapability Subform component
This component is used three times in this App (in all three screens). At this screen it is used as standalone form
1. Get path to current capability (could be: `values.main.customCapability` or `values.customCapability`): https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CapabilitySubForm.js#L18
2. use custom hook to create options for selector: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CapabilitySubForm.js#L20
this hook fetched resource from api and provides array of selector-ready options + function to create new option (which will appear in selector after creation)
https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/useSelectorOptions.js#L51
3. Form will render `SimpleField` component: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CapabilitySubForm.js#L28
which is for text and number inputs. We can pass props with path to field which will be updated and label for input
    1. SimpleField props available here: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/components/SimpleField.js#L6
    2. It will get the context in which it currently rendered: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/components/SimpleField.js#L13
    3. Get formik from the context: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/components/SimpleField.js#L14
    4. When input change happens formik.handleChange will be called: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/components/SimpleField.js#L30
    5. It will know what to update by input name https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/components/SimpleField.js#L29 (which is path to field)
4. There is also `SelectField` https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CapabilitySubForm.js#L51, for list of tags in this case: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CapabilitySubForm.js#L52
    1. Select field gets it's rendering context
    2. it recalculates it's current value: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/components/SelectField.js#L28 everytime when
raw field value (as it in form changes) or when list of options changes: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/components/SelectField.js#L35 
    3. onChange it will detect what we're changing array or single https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/components/SelectField.js#L40
    and will call `formik.setValue` for provided `fieldPath` and will put form compatible value and put there. https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/components/SelectField.js#L41
    This logic is needed because ReactSelect operates with options which should have exactly this shape:
    `{ label: 'abc', value: 'hello' }`

### Capability sub form renders also CommandsInputs component
1. It detects at which context it's rendered and gets formik to control form state and access data
2. it uses custom hook to get options for selector and function to create new one: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CommandsInputs.js#L15
3. Then it prepares handlers and re-shapes data.
4. It will create handler for selector which changes not field values but field KEYS: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CommandsInputs.js#L20
https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/utils.js#L11
5. Then for each command it will render `ArgumentsPanel`: https://github.com/megarocks/formio-for-iot/blob/461bae3d9529b244eccda4dc3c5c5813a079fb3f/frontend/src/CommandsInputs.js#L39

### ArgumentsPanel
1. It detects at which context it's rendered and gets formik to control form state and access data
2. Prepares data and handlers
3. Renders Inputs and Selects

# Scripts
## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
