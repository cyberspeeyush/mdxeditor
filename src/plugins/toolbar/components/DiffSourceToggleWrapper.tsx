import React from 'react'
import { diffSourcePluginHooks } from '../../diff-source'
import { SingleChoiceToggleGroup } from '.././primitives/toolbar'
import styles from '../../../styles/ui.module.css'

/**
 * A wrapper element for the toolbar contents that lets the user toggle between rich text, diff and source mode.
 * Put the rich text toolbar contents as children of this component.
 * For this component to work, you must include the `diffSourcePlugin`.
 *
 * @example
 * ```tsx
 *  <MDXEditor markdown='Hello world'
 *    plugins={[toolbarPlugin({
 *      toolbarContents: () => ( <> <DiffSourceToggleWrapper><UndoRedo /><BoldItalicUnderlineToggles /></DiffSourceToggleWrapper></>)
 *    }), diffSourcePlugin()]}
 *  />
 * ```
 */
export const DiffSourceToggleWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode] = diffSourcePluginHooks.useEmitterValues('viewMode')
  const changeViewMode = diffSourcePluginHooks.usePublisher('viewMode')
  const [iconComponentFor] = diffSourcePluginHooks.useEmitterValues('iconComponentFor')

  return (
    <>
      {viewMode === 'rich-text' ? (
        children
      ) : viewMode === 'diff' ? (
        <span className={styles.toolbarTitleMode}>Diff mode</span>
      ) : (
        <span className={styles.toolbarTitleMode}>Source mode</span>
      )}

      <div style={{ marginLeft: 'auto', pointerEvents: 'auto', opacity: 1 }}>
        <SingleChoiceToggleGroup
          className={styles.diffSourceToggle}
          value={viewMode}
          items={[
            { title: 'Rich text', contents: iconComponentFor('rich_text'), value: 'rich-text' },
            { title: 'Diff mode', contents: iconComponentFor('difference'), value: 'diff' },
            { title: 'Source', contents: iconComponentFor('markdown'), value: 'source' }
          ]}
          onChange={(value) => changeViewMode(value || 'rich-text')}
        />
      </div>
    </>
  )
}
