import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
    }));
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError('');
        setResult(null);

        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('The backend could not parse this pipeline.');
            }

            setResult(await response.json());
        } catch (err) {
            setError(err.message || 'Something went wrong while submitting the pipeline.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeDialog = () => {
        setResult(null);
        setError('');
    };

    return (
        <div className="submit-bar">
            <button
                className="submit-button"
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Analyzing...' : 'Submit Pipeline'}
            </button>

            {(result || error) && (
                <div className="modal-backdrop" role="presentation" onClick={closeDialog}>
                    <div
                        className="result-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Pipeline parse result"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="result-modal__header">
                            <div>
                                <p className="toolbar__eyebrow">Pipeline Analysis</p>
                                <h2>{error ? 'Submission failed' : 'Pipeline analyzed'}</h2>
                            </div>
                            <button className="icon-button" type="button" onClick={closeDialog}>
                                x
                            </button>
                        </div>

                        {error ? (
                            <p className="result-modal__error">{error}</p>
                        ) : (
                            <div className="result-grid">
                                <div>
                                    <span>Nodes</span>
                                    <strong>{result.num_nodes}</strong>
                                </div>
                                <div>
                                    <span>Edges</span>
                                    <strong>{result.num_edges}</strong>
                                </div>
                                <div>
                                    <span>DAG</span>
                                    <strong>{result.is_dag ? 'Yes' : 'No'}</strong>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
