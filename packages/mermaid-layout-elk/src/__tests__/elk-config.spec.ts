import { describe, it, expect } from 'vitest';
import { extractFrontMatter } from '../../../mermaid/src/diagram-api/frontmatter.js';

describe('ELK layout configuration via frontmatter', () => {
  it('parses aspectRatio from frontmatter', () => {
    const text = `---
config:
  layout: elk
  elk:
    aspectRatio: 1.77
---
graph TB
    A --> B --> C`;

    const result = extractFrontMatter(text);
    expect(result.metadata).toHaveProperty('config');

    const config = result.metadata.config as Record<string, unknown>;
    expect(config.layout).toBe('elk');

    const elk = config.elk as Record<string, unknown>;
    expect(elk.aspectRatio).toBe(1.77);
  });

  it('parses edgeRouting from frontmatter', () => {
    const text = `---
config:
  layout: elk
  elk:
    edgeRouting: ORTHOGONAL
---
graph TB
    A --> B`;

    const result = extractFrontMatter(text);
    const config = result.metadata.config as Record<string, unknown>;
    const elk = config.elk as Record<string, unknown>;
    expect(elk.edgeRouting).toBe('ORTHOGONAL');
  });

  it('parses combined elk options from frontmatter', () => {
    const text = `---
config:
  layout: elk
  elk:
    aspectRatio: 1.33
    edgeRouting: ORTHOGONAL
    mergeEdges: true
    nodePlacementStrategy: NETWORK_SIMPLEX
---
graph TB
    A --> B`;

    const result = extractFrontMatter(text);
    const config = result.metadata.config as Record<string, unknown>;
    const elk = config.elk as Record<string, unknown>;
    expect(elk.aspectRatio).toBe(1.33);
    expect(elk.edgeRouting).toBe('ORTHOGONAL');
    expect(elk.mergeEdges).toBe(true);
    expect(elk.nodePlacementStrategy).toBe('NETWORK_SIMPLEX');
  });

  it('omits aspectRatio when not provided', () => {
    const text = `---
config:
  layout: elk
---
graph TB
    A --> B`;

    const result = extractFrontMatter(text);
    const config = result.metadata.config as Record<string, unknown>;
    expect(config.layout).toBe('elk');
    expect(config.elk).toBeUndefined();
  });
});
