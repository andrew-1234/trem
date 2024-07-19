"""
This type stub file was generated by pyright.
"""

import django
import markdown
import pygments
from django.views.generic import View
from markdown.preprocessors import Preprocessor

"""
The `compat` module provides support for backwards compatibility with older
versions of Django/Python, and compatibility wrappers around optional packages.
"""
def unicode_http_header(value): # -> str:
    ...

if 'patch' not in View.http_method_names:
    ...
HEADERID_EXT_PATH = ...
LEVEL_PARAM = ...
def apply_markdown(text): # -> str:
    """
        Simple wrapper around :func:`markdown.markdown` to set the base level
        of '#' style headers to <h2>.
        """
    ...

def pygments_highlight(text, lang, style):
    ...

def pygments_css(style):
    ...

if markdown is not None and pygments is not None:
    class CodeBlockPreprocessor(Preprocessor):
        pattern = ...
        formatter = ...
        def run(self, lines): # -> list[str]:
            ...
        
    
    
    def md_filter_add_syntax_highlight(md): # -> Literal[True]:
        ...
    
else:
    def md_filter_add_syntax_highlight(md): # -> Literal[False]:
        ...
    
if django.VERSION >= (5, 1):
    ...
else:
    def ip_address_validators(protocol, unpack_ipv4): # -> Callable[[Any], None]:
        ...
    
SHORT_SEPARATORS = ...
LONG_SEPARATORS = ...
INDENT_SEPARATORS = ...
